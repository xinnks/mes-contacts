<template>
	<div class="p-3 bg-gray-200 sm:mx-1 md:mx-20 lg:mx-32 xl:mx-48">
		<h1 class="text-center">Target Planner</h1>
		<div class="flex flex-col items-center align-middle my-2">
            <div class="sm:w-full md:w-1/2 lg:w-2/3 xl:w-3/5 flex flex-row items-center justify-start">
            	<div class="flex-1 text-left">
            		<label for="investment">Investment</label>
            	</div>
                <div class="flex-2">
                	<input type="number" id="investment" v-model="investment" placeholder="Investment" class="w-full m-1 h-8 outline-none px-4 py-1">
                </div>
            </div>
            <div class="sm:w-full md:w-1/2 lg:w-2/3 xl:w-3/5 flex flex-row items-center">
            	<div class="flex-1 text-left">
            		<label for="targetPercent">Weekly Target Percent (%)</label>
            	</div>
                <div class="flex-2">
                	<input type="number" id="targetPercent" v-model="targetPercent" placeholder="Target Percent" max="100" class="w-full m-1 h-8 outline-none px-4 py-1">
                	</div>
            </div>
            <div class="sm:w-full md:w-1/2 lg:w-2/3 xl:w-3/5 flex flex-row items-center">
            	<div class="flex-1 text-left">
            		<label for="weekCount">Weeks</label>
            	</div>
                <div class="flex-2">
                	<input type="number" id="weekCount" v-model.number="weekCount" placeholder="Week Count" class="w-full m-1 h-8 outline-none px-4 py-1">
                	</div>
            </div>
            <div class="flex-grow-0 ml-2 mr-0 cursor-pointer rounded-full">
                <button class="fill-current rounded-full text-white hover:text-black focus:text-black active:shadow-inner active:text-red-300 bg-gray-500 hover:bg-gray-400 m-2 p-2 cursor-pointer" w="80" h="40" @click="calculate()">Calculate</button>
                <!-- <button :class="Plan.length > 0 ? 'fill-current rounded-full text-white hover:text-black focus:text-black active:shadow-inner active:text-red-300 bg-gray-500 hover:bg-gray-400 m-2 p-2 cursor-pointer' : 'fill-current rounded-full cursor-not-allowed text-white active:shadow-inner  bg-gray-300 m-2 p-2'" w="80" h="40" @click="printDoc()" :disabled="Plan.length > 0">Print</button> -->
            </div>
        </div>

        <!-- <div class="flex flex-col sm:items-center md:items-start lg:items-start xl:items-start">
            <div class="inline-flex items-center bg-white hover:bg-gray-100 cursor-pointer w-full h-auto sm:mx-1 md:mx-2 lg:mx-3 xl:mx-4 p-2 my-1" v-for="(detail, key) of Plan" :key="key">
		        <div class="flex-grow-0 ml-1">
		            {{detail.week}}
		        </div>
		        <div class="flex-grow text-left px-3">
		            <span class=""> {{detail.amount}}</span>
		        </div>
		    </div>
        </div> -->
        <div class="flex flex-col items-center my-2">
        	<table class="sm:w-full md:w-1/2 lg:w-2/3 xl:w-3/5 bg-white border-l border-r border-gray-800 text-left">
	        	<tr class="m-1 border-t border-gray-800 border-b">
	        		<th class="p-2">Week</th>
	        		<th class="p-2 border-l border-gray-600">Target(+{{targetPercent}}%)</th>
	        		<th class="p-2 border-l border-gray-600">Amount</th>
	        	</tr>
	        	<tr v-for="(detail, key) of Plan" :key="key" class="border-gray-600 border-b">
	        		<td class="p-2">{{detail.week}}</td>
	        		<td class="p-2 border-l border-gray-600"> +{{detail.difference | currency}}</td>
	        		<td class="p-2 border-l border-gray-600">{{detail.amount | currency}}</td>
	        	</tr>
	        </table>
        </div>
        
    </div>
</template>
<script>
export default {
  name: 'TargetPlanner',
  data () {
    return {
    	Plan: [],
    	investment: '',
    	targetPercent: '',
    	weekCount: ''
    }
  },
  methods:{
  	calculate(){
  		let tempStorage = this.investment;
  		this.Plan = [];
  		let floatingAmount = parseInt(this.investment);
  		for(let i=1; i<=this.weekCount; i++){
  			var j = i > 1 ? i-1 : 1
  			floatingAmount += parseInt((floatingAmount*(this.targetPercent/100)));
  			var difference = parseInt(floatingAmount - tempStorage)
  			if((i%4 === 0)){
  				this.Plan.push({
					week: /*'Week: '+*/i/*+' Month: '+i/4*/,
					amount: floatingAmount,
					difference: difference
				});
  			}else{
  				this.Plan.push({
	  				week: /*'Week: '+*/i,
	  				amount: floatingAmount,
	  				difference: difference
	  			});
  			}
  			tempStorage = floatingAmount
  			
  		}
  	},
  	printDoc(){
  		window.print()
  	}
  }
};
</script>

<style lang="css" scoped>
::selection{
	background: #a0aec0;
	color: #000000;
}
</style>