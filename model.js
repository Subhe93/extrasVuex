import Vue from 'vue';


Vue.prototype.$model = function(name, params)
{
	if (Array.isArray(params) === false && !!params) {
		params = [params];
	}

	return new Model(name, params, this);
};

class Model
{
	constructor(name, params, vue)
	{
		this.name = name;
		this.params = params;
		this.vue = vue;
	}

	/**
	 * @param object query
	 */
	get(query)
	{
		return this.send("get", query);
	}

	/**
	 * @param object data
	 */
	create(data)
	{
		return this.send("post", data);
	}

	/**
	 * @param object data
	 */
	update(data)
	{
		return this.send("put", data);
	}

	delete()
	{
		return this.send("delete");
	}

	/**
	 * @param string method
	 * @param object data
	 */
	send(method, data)
	{
		method = method.toUpperCase();

		if (method === "GET") {
			return this.vue.$axios.get(buildUrl(this.name, this.params, data));
		}

		if (!data) {
			data = this.vue.$form({ _method: method });
		} else {
			data["_method"] = method;
			data = this.vue.$form(data);
		}

		return this.vue.$axios.post(buildUrl(this.name, this.params), data);
	}
}

function buildUrl(path, params, query)
{
	if (Array.isArray(params) && params.length > 0) {
		params.unshift(path);
		path = params.join("/");
	}

	query = new URLSearchParams(query).toString();

	if (query) {
		path += "?" + query;
	}

	return path;
}
