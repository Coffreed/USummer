#pragma strict


function Start(){
	
}

var child:Transform;
var speed = 5.0f;
var rotateSpeed:float;
var sphere:GameObject;
var ballPrefab:Transform;
var ballSpeed:float = 200;
var air : boolean;
var jump:AudioClip;
var onTop:AudioClip;
var onWater:AudioClip;
var vertices:Vector3[];

function Update () {
	//transform.position.x += 0.1;
	//transform.position.y += 0.1;
	transform.Translate(Vector3(0, 0, Input.GetAxis("Vertical")) * Time.deltaTime * speed);
	transform.Rotate(Vector3(0, Input.GetAxis("Horizontal"), 0) * rotateSpeed * Time.deltaTime);
	
	if(Input.GetKeyDown(KeyCode.F) && air == false){
		rigidbody.velocity.y = 20;
		AudioSource.PlayClipAtPoint(jump,transform.position);
		air = true;
	}
	
	if(Input.GetKeyDown(KeyCode.R)){
        child = transform.Find("Head");
        child.renderer.material.color = Color.red;
        child = transform.Find("LeftArm");
        child.renderer.material.color = Color.red;
        child = transform.Find("LeftLeg");
        child.renderer.material.color = Color.red;
        child = transform.Find("RightArm");
        child.renderer.material.color = Color.red;
        child = transform.Find("RightLeg");
        child.renderer.material.color = Color.red;
    }else if(Input.GetKeyDown(KeyCode.B)){
        child = transform.Find("Head");
        child.renderer.material.color = Color.blue;
        child = transform.Find("LeftArm");
        child.renderer.material.color = Color.blue;
        child = transform.Find("LeftLeg");
        child.renderer.material.color = Color.blue;
        child = transform.Find("RightArm");
        child.renderer.material.color = Color.blue;
        child = transform.Find("RightLeg");
        child.renderer.material.color = Color.blue;
    }else if(Input.GetKeyDown(KeyCode.Y)){
        child = transform.Find("Head");
        child.renderer.material.color = Color.yellow;
        child = transform.Find("LeftArm");
        child.renderer.material.color = Color.yellow;
        child = transform.Find("LeftLeg");
        child.renderer.material.color = Color.yellow;
        child = transform.Find("RightArm");
        child.renderer.material.color = Color.yellow;
        child = transform.Find("RightLeg");
        child.renderer.material.color = Color.yellow;
    }
    
/*	if(Input.GetKeyDown(KeyCode.Space)){
    var ball :Transform= Instantiate(ballPrefab,
        transform.Find("SpawnPoint").transform.position,
        Quaternion.identity);
    ball.rigidbody.AddForce(transform.forward*ballSpeed); 
	}*/
	
	if(Input.GetKeyDown(KeyCode.R)){
        if(!rigidbody){
            gameObject.AddComponent(Rigidbody);
            rigidbody.constraints = RigidbodyConstraints.FreezeRotationX |
                RigidbodyConstraints.FreezeRotationZ;
        }
    }
	
/*	if(Input.GetKey(KeyCode.UpArrow))
		transform.position.z += 0.1;
	if(Input.GetKey(KeyCode.DownArrow))
		transform.position.z -= 0.1;
	if(Input.GetKey(KeyCode.LeftArrow))
		transform.position.x -= 0.1;
	if(Input.GetKey(KeyCode.RightArrow))
		transform.position.x += 0.1;
	if(Input.GetKey(KeyCode.Space))
		transform.position += transform.up;
	if(Input.GetKey(KeyCode.C))
		transform.position = Vector3(1,1,1);
		
	if(Input.GetKeyDown(KeyCode.E)){
    sphere = GameObject.CreatePrimitive(PrimitiveType.Cube);
    sphere.transform.position = transform.position;
    sphere.transform.position.y = transform.position.y+1;
    sphere.transform.parent = transform;
    }
    if(Input.GetKeyDown(KeyCode.Q)){
        sphere.transform.parent = null;
    }
   */ 
}

function OnCollisionEnter(other:Collision){
		
		if(other.gameObject.tag != "Tramp"){
		air = false;
		}
		if(other.gameObject.tag == "Tramp" && air == true){
    	rigidbody.velocity.y = 9;
    	AudioSource.PlayClipAtPoint(onTop,transform.position);
    	}
    
    for(var v = 0;v<vertices.Length;v++)
    	if(other.gameObject.tag != "Water"){
    	vertices[v].y = 5*Mathf.Cos(0.5*Time.time+0.5*v);
    	AudioSource.PlayClipAtPoint(onTop,transform.position);
    	}
}

function FixedUpdate () {
    rigidbody.AddForce(Vector3(0, 0, Input.GetAxis("Vertical")) * speed);
    rigidbody.AddTorque(Vector3(0, Input.GetAxis("Horizontal"), 0) * rotateSpeed);
}