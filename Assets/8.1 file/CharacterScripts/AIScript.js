var Distance;
var Target : Transform;
var child:Transform;
var lookAtDistance = 25.0;
var attackRange = 15;
var moveSpeed = 5.0;
var Damping = 6.0;
var yaargh:AudioClip;
var timer:int;
var stopSpeed = 0;
var Waypoint1 : Transform;
var Waypoint2 : Transform;
var Waypoint3 : Transform;
var Waypoint4 : Transform;
var patrolTime : float;

private var attackTime : float;
var attackRepeatTime = 1;

function Start(){
	
}

function Update (){
	Distance = Vector3.Distance(Target.position, transform.position);
	
	if (Distance < lookAtDistance)
	{
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
		lookAt();
	}
	
	if (Distance > lookAtDistance)
	{
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
        patrol1();
        patrol2();
        patrol3();
        
	}
	
	if (Distance < attackRange){
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
		attack();
	}
}

function lookAt(){
	var rotation = Quaternion.LookRotation(Target.position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
}

function attack(){
	var rotation = Quaternion.LookRotation(Target.position - transform.position);
	Distance = Vector3.Distance(Target.position, transform.position);
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	
	if(Time.time > attackTime)
	{
	attackTime = Time.time + attackRepeatTime;
	AudioSource.PlayClipAtPoint(yaargh, transform.position,1.0f);
	} 
}

function patrol1(){
	
	var rotation = Quaternion.LookRotation(Waypoint1.position - transform.position);
		
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	Distance = Vector3.Distance(Waypoint1.position, transform.position);
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	
}

function patrol2(){
	
	var rotation = Quaternion.LookRotation(Waypoint2.position - transform.position);
		
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	Distance = Vector3.Distance(Waypoint2.position, transform.position);
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	
}

function patrol3(){
	
	var rotation = Quaternion.LookRotation(Waypoint3.position - transform.position);
		
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	Distance = Vector3.Distance(Waypoint3.position, transform.position);
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	
}

function patrol4(){
	
	var rotation = Quaternion.LookRotation(Waypoint4.position - transform.position);
		
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	Distance = Vector3.Distance(Waypoint4.position, transform.position);
	transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	
}

function reset(){
	timer = 0;
}


function OnTriggerEnter(other:Collider){
    if(other.gameObject.name == "wp1"){
        patrol2(); 
    }
    else if(other.gameObject.name == "wp2"){
        patrol3(); 
 	}
 	else if(other.gameObject.name == "wp3"){
 		patrol1();
 	}
 	else if(other.gameObject.name == "wp4"){
 		patrol1();
 	}
} 

/*function OnCollision(){
	var rotation = Quaternion.LookRotation(Waypoint1.position - transform.position);
    if(gameObject.tag == "wp1")
    {
        Distance = Vector3.Distance(Waypoint2.position, transform.position);
		transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
    }
    else if(gameObject.tag == "wp2")
    {
        Distance = Vector3.Distance(Waypoint3.position, transform.position);
		transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
    }
    else if(gameObject.tag == "wp3")
    {
        Distance = Vector3.Distance(Waypoint1.position, transform.position);
		transform.Translate(Vector3.forward * moveSpeed * Time.deltaTime);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
	}
}*/