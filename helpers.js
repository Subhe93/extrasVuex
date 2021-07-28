import Vue from "vue";
import localforage from "localforage";

// Avatar
Vue.prototype.$avatar = function(userId) {
	return `${process.env.OBJECT_URL}/avatars/${userId}`;
};

// Get static file url.
Vue.prototype.$asset = function(path) {
	return `${process.env.OBJECT_URL}/assets/${path}`;
};

Vue.prototype.$error = function(message)
{
	this.$q.notify({
		icon: "warning",
		type: "negative",
		message: this.$t(message)
	});
};

Vue.prototype.$errors = function(errors)
{
	for (var i in errors) {
		this.$error(errors[i][0]);
	}
};

async function getValue(key)
{
	var result = await localforage.getItem(key);
	return result;
}

/**
 * Get item from localForage.
 */
Vue.prototype.$getItem = function(key, def)
{
	return localforage.getItem(key).then(val => val || def);
};

/**
 * Set localforage item.
 */
Vue.prototype.$setItem = async function(key, value)
{
	return await localforage.setItem(key, value);
};

Vue.prototype.$ok = function(message)
{
	this.$q.notify({
		icon: "done",
		color: "positive",
		message: message
	});
};

Vue.prototype.$errorHandler = function(err, notify)
{
	if (notify) {
		this.$error(err.message);
	}

	console.error(err);
};


Vue.prototype.$confirm = function(message, title)
{
	return this.$q.dialog({
		title: title || "تأكيد",
		message: message,
		cancel: true,
		persistent: true
	});
};

const hasFile = function(data)
{
	for (var i in data)
	{
		if (data[i] instanceof File) {
			return true;
		}
	}

	return false;
};

Vue.prototype.$form = function(data)
{
	if (hasFile(data) === false) {
		return data;
	}

	const fd = new FormData();

	for (const i in data) {
		fd.append(i, data[i]);
	}

	return fd;
};

String.prototype.capitalize = function()
{
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toInt = function()
{
	return parseInt(this);
};

Number.prototype.toInt = function()
{
	return this;
};

