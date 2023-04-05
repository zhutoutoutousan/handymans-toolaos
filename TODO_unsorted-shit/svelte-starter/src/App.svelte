<script>
	export let name;
	export let age;

	function incrementAge() {
		age++;
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}, my age is {age}!</h1>
<button on:click="{incrementAge}">Change Age</button>
