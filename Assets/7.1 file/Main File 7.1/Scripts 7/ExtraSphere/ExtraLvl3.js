#pragma strict

//var timer : float;
var speed:float;
private var velocity : Vector3 = Vector3.zero;
var stuckPos:Transform;
var wallsound : AudioClip;
var padsound : AudioClip;
var stuck:boolean;
var go :GameObject;
var scoreScript:LevelScript3;

function Start(){
    stuckPos =GameObject.FindWithTag("Pad").transform.Find("Stuck").transform; 
    BallStuck();
    go = GameObject.Find("CannonBall");
    scoreScript = go.GetComponent("LevelScript3");
}

function FixedUpdate () { 
    rigidbody.MovePosition(rigidbody.position + velocity ); 
}

function Update(){
	//timer++;
    if(stuck){
        if( Input.GetMouseButtonDown(1)){
            transform.parent = null;
            rigidbody.isKinematic =false;
            velocity = Vector3(0,0,speed);
            stuck=false;
           // Reset();
        } 
    }
}

/*function Reset()
{
   timer = 0;
}*/

function OnCollisionEnter(other : Collision){
    var norm : Vector3 = other.contacts[0].normal;
    if(other.gameObject.tag == "Side"){ 
        velocity= velocity- 2 * norm * Vector3.Dot(velocity, norm.normalized);
        velocity.y = 0; 
        AudioSource.PlayClipAtPoint(wallsound,transform.position,0.5f);
    }else if(other.gameObject.tag == "Back"){ 
        velocity= velocity- 2 * norm * Vector3.Dot(velocity, norm.normalized);
        velocity.y = 0; 
        AudioSource.PlayClipAtPoint(wallsound,transform.position,0.5f);
        //Reset(); 
    }else if(other.gameObject.tag =="Pad"){
        velocity = velocity - 2 * norm * Vector3.Dot(velocity, norm.normalized);
        velocity.y = 0;
        AudioSource.PlayClipAtPoint(padsound,transform.position,0.5f);
        //Reset();
    }else if(other.gameObject.tag=="Chest"){
        LevelScript3.chestCount -= 1;
        LevelScript3.score +=100;
        scoreScript.scoreTemp +=200; // Modify this line
    	scoreScript.UpdateScore();
        if(LevelScript3.chestCount == 0){
            go.SendMessage("EndLevel",other.gameObject);
        }else{
            velocity = velocity - 2 * norm * Vector3.Dot(velocity, norm.normalized);
            velocity.y = 0;
            AudioSource.PlayClipAtPoint(padsound,transform.position,0.5f); 
            Destroy(other.gameObject);
        }
        //Reset();
    }
}

function OnTriggerEnter(other:Collider){
    if(other.gameObject.name == "DeathZone"){
        Destroy(gameObject);
    }
/*    else if(other.gameObject.name == "StartZone" && stuck == false){
        if(timer >= 90){
 			BallStuck();
 		}
 	}
 	else if(other.gameObject.name == "MidField" && timer >= 70){
 		BallStuck();
 	}
 	else if(other.gameObject.name == "EndZone" && timer >= 100){
 		BallStuck();
 	} */
} 

function BallStuck(){
    transform.parent = stuckPos;
    rigidbody.isKinematic =true;
    velocity = Vector3.zero;
    stuck = true;
}