#pragma strict

var ballPrefab:Transform;
var ballSpeed:float = 200;

function Update(){	 
	if(Input.GetKeyDown(KeyCode.Space)){
    	var ball :Transform= Instantiate(ballPrefab,
    	transform.Find("SpawnPoint").transform.position,
    	Quaternion.identity);
    	ball.rigidbody.AddForce(transform.forward*ballSpeed); 
	}
}