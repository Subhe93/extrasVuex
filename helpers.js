import { boot } from 'quasar/wrappers'
import localforage from "localforage";

// Avatar
export default boot(({ app }) => {
	 app.config.globalProperties.$avatar = function (userId) {
		return `${process.env.OBJECT_URL}/avatars/${userId}`;
	};

	// Get static file url.
	 app.config.globalProperties.$asset = function (path) {
		return `${process.env.OBJECT_URL}/assets/${path}`;
	};

	 app.config.globalProperties.$error = function (message) {
		this.$q.notify({
			icon: "warning",
			type: "negative",
			message: this.$t(message)
		});
	};

	 app.config.globalProperties.$errors = function (errors) {
		for (var i in errors) {
			this.$error(errors[i][0]);
		}
	};


	/**
	 * Get item from localForage.
	 */
	 app.config.globalProperties.$getItem = function (key, def) {
		return localforage.getItem(key).then(val => val || def);
	};

	/**
	 * Set localforage item.
	 */
	 app.config.globalProperties.$setItem = async function (key, value) {
		return await localforage.setItem(key, value);
	};

	 app.config.globalProperties.$ok = function (message) {
		this.$q.notify({
			icon: "done",
			color: "positive",
			message: message
		});
	};

	 app.config.globalProperties.$errorHandler = function (err, notify) {
		if (notify) {
			this.$error(err.message);
		}

		console.error(err);
	};


	 app.config.globalProperties.$confirm = function (message, title) {
		return this.$q.dialog({
			title: title || "تأكيد",
			message: message,
			cancel: true,
			persistent: true
		});
	};

	const hasFile = function (data) {
		for (var i in data) {
			if (data[i] instanceof File) {
				return true;
			}
		}

		return false;
	};

	 app.config.globalProperties.$form = function (data) {
		if (hasFile(data) === false) {
			return data;
		}

		const fd = new FormData();

		for (const i in data) {
			fd.append(i, data[i]);
		}

		return fd;
	};

	
});
String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	String.prototype.toInt = function () {
		return parseInt(this);
	};

	Number.prototype.toInt = function () {
		return this;
	};
	async function getValue(key) {
		var result = await localforage.getItem(key);
		return result;
	}
