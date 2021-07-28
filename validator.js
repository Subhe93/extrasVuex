import Vue from "vue";
import Validator from "validatorjs";

Validator.useLang("ar");

const v = function(name, rules, func) {
	return [
		val => {
			return new Promise((resolve, reject) =>
			{
				setTimeout(() =>
				{
					const validator = new Validator(
						{ [name]: val },
						{ [name]: rules }
					);

					if (validator.fails()){

						resolve(validator.errors.first(name));
						return;

					} else if (typeof func === "function") {

						resolve(func(val));
						return;
					}

					resolve(true);
				}, 200);
			});
		}
	];
};

Vue.prototype.$v = v;
