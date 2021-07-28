import Vue from 'vue';


// Simple state.
class __val {

	constructor(val)
	{
		this.value = val;
	}
}


const state =
{
	values: {},

	get: function(k, initValue)
	{
		if (!this.values[k]) {
			this.values[k] = new __val(initValue);
		}

		return this.values[k];
	},

	set: function(k, v)
	{
		return new Promise(resolve => resolve(this.get(k).value = v));
	}

};

Vue.prototype.$state = state;
