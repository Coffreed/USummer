#pragma strict

 var stuckPos:Transform;
 private var velocity : Vector3;
 var speed: float;
 private var life : int = 3;
 var wallsound : AudioClip;
 var padsound : AudioClip;
 var launchsound : AudioClip;
 var overboard : AudioClip;
 var stuck :boolean;
 var startTime;
 var timer : float;
 var timerLim : int;

 function Start () {
        stuckPos =GameObject.FindWithTag("Pad").transform.Find("Stuck").transform;
        BallStuck();
 }

 function FixedUpdate () {
        rigidbody.MovePosition(rigidbody.position + velocity);
 }

 function Update(){
		timer++;
        if(stuck){
               if( Input.GetMouseButtonDown(1)){
                      transform.parent = null;
                      rigidbody.isKinematic = false;
                      velocity = Vector3(0,0,speed);
                      stuck = false;
                      AudioSource.PlayClipAtPoint(launchsound,transform.position,0.5f);
                      Debug.Log(life);
                      Reset();
                  }
        }
        
 }
 
/* function TimerStart(){
 
 startTime = Time.time;
 
 timer = Time.time;
 
 		if(timer > 2){
 			
 		} 
 } */
 
 function Reset()
 {
    timer = 0;
 }

 function OnCollisionEnter(other : Collision){
        var norm : Vector3 = other.contacts[0].normal;
        if(other.gameObject.tag == "Side"){ 
              velocity = velocity - 2 * norm * Vector3.Dot(velocity,norm.normalized);
              velocity.y = 0;
              AudioSource.PlayClipAtPoint(wallsound,transform.position,0.5f); 
        }else if(other.gameObject.tag == "Back"){ 
              velocity = velocity - 2 * norm * Vector3.Dot(velocity,norm.normalized);
              velocity.y = 0;
              AudioSource.PlayClipAtPoint(wallsound,transform.position,0.5f);
              Reset();
        }else if(other.gameObject.tag =="Pad"){
              velocity = velocity - 2 * norm * Vector3.Dot(velocity, norm.normalized);
              velocity.y = 0;
              AudioSource.PlayClipAtPoint(padsound,transform.position,0.5f);         
              Reset();
        }
 }

 function OnTriggerEnter(other:Collider){
        if(other.gameObject.name == "DeathZone"){
        	AudioSource.PlayClipAtPoint(overboard,transform.position,0.5f);
            life -=1;
            BallStuck();
        }
        else if(other.gameObject.name == "StartZone" && stuck == false){
        	if(timer >= timerLim){
 				BallStuck();
 				}
 		}
 		else if(other.gameObject.name == "MidField" && timer >= 50){
 			BallStuck();
 		}
 		else if(other.gameObject.name == "EndZone" && timer >= 150){
 			BallStuck();
 		}
 } 


 function BallStuck(){ 
        transform.position = stuckPos.position;
        transform.parent = stuckPos;
        rigidbody.isKinematic = true;
        velocity = Vector3.zero;
        stuck =true;
 }