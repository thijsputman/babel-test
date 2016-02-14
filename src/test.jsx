async function foo(){
		
  let response = await fetch('/static/some-data.txt');
	
  console.log(response);
	
  alert(await response.text());
}

foo();
