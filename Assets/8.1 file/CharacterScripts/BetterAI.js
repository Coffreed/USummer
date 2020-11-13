var Distance;
var Target : Transform;
var child: Transform;
var lookAtDistance = 25.0;
var attackRange = 1;
var chaseRange = 15;
var moveSpeed = 1.0;
var Damping = 6.0;
var attackRepeatTime = 1;

private var attackTime : float;
private var attackNow = true;

var yaargh:AudioClip;
var stopSpeed = 0;

var controller : CharacterController;
var gravity : float = 20.0;
private var MoveDirection : Vector3 = Vector3.zero;

function Start(){
	attackTime = Time.time;
}

function Update (){
	Distance = Vector3.Distance(Target.position, transform.position);
	
	if (Distance < lookAtDistance)
	{
		lookAt();
	}
	
	if (Distance > lookAtDistance)
	{
		child = transform.Find("Head");
        child.renderer.material.color = Color.cyan;
        child = transform.Find("LeftArm");
        child.renderer.material.color = Color.cyan;
        child = transform.Find("LeftLeg");
        child.renderer.material.color = Color.cyan;
        child = transform.Find("RightArm");
        child.renderer.material.color = Color.cyan;
        child = transform.Find("RightLeg");
        child.renderer.material.color = Color.cyan;
	}
	
	if (Distance < attackRange)
	{
		attack();
	}
	else if (Distance < chaseRange)
	{
		chase();
	}
}

function lookAt(){
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
	var rotation = Quaternion.LookRotation(Target.position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * Damping);
}

function chase(){
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
	
	moveDirection = transform.forward;
	moveDirection *= moveSpeed;
	
	moveDirection.y -= gravity * Time.deltaTime;
	controller.Move(moveDirection * Time.deltaTime);
}

function attack(){
	
	if(Time.time > attackTime)
	{
		Debug.Log("Attack");
		attackTime = Time.time + attackRepeatTime;
		AudioSource.PlayClipAtPoint(yaargh, transform.position,1.0f); 
	}
}