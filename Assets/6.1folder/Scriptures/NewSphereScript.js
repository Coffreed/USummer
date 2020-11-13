#pragma strict

var timer : float;
var stuckPos:Transform;
private var velocity:Vector3;
var speed :float;
private var life :int = 3;
var stuck :boolean;
var wallsound : AudioClip;
var padsound :AudioClip;
var chestSound :AudioClip;
var chest: Transform;
var chests = new Transform[36];
var totalChestAmount:int;
var chestAmountNegative: int;
var chestAmountPositive: int;
var chestY:float;
var chestX:float;
var chestZ:float;
static var chestCount:int;
var scoreTemp:int = 0;
static var score:int;
var powerup : Rigidbody;
var count: int;
var map: GameObject;
var other: Camera;
var winning: AudioClip;
var losing: AudioClip;
var ouch: AudioClip;
var won: boolean;
var posX: float;
var posZ: float;

function Start () {
    stuckPos =GameObject.FindWithTag("Pad").transform.Find("Stuck").transform; 
    BallStuck();
    var index : int = 0;
    for (var z:int = 0; z>=chestZ; z = z - chestAmountNegative){
        for (var x:int = 0;x<=chestX; x = x + chestAmountPositive){
            var go =Instantiate(chest, Vector3(x + posX,chestY, z + posZ) * 0.75,Quaternion(0,180,0,0));
            index++;    
            
        }
        
    }
    chestCount = totalChestAmount;
    scoreTemp = 0;
    count = 0;
    other = FindObjectOfType(Camera);
    won=true;
}

function FixedUpdate(){
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
            Reset();
        }
    }
}

function BallStuck(){
    transform.position = stuckPos.position;
    transform.parent = stuckPos;
    rigidbody.isKinematic = true;
    velocity = Vector3.zero;
    stuck = true;
}

function Reset()
{
   timer = 0;
}

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
        Reset();
    }else if(other.gameObject.tag =="Pad"){
        velocity = velocity - 2 * norm * Vector3.Dot(velocity, norm.normalized);
        velocity.y = 0; 
        AudioSource.PlayClipAtPoint(padsound,transform.position,0.5f);
        Reset();
    }else if(other.gameObject.tag=="Chest"){
        chestCount -= 1;
        scoreTemp += 200;
        AudioSource.PlayClipAtPoint(ouch,transform.position,0.5f);
        if(chestCount == 0)
            EndLevel(other.gameObject);
        else{
            velocity = velocity- 2 * norm * Vector3.Dot(velocity, norm.normalized);
            velocity.y = 0; 
            AudioSource.PlayClipAtPoint(chestSound,transform.position,0.5f);
            count++;
            if (count == 10){
                Instantiate(powerup,other.transform.position, Quaternion.identity);
                count = 0;
            }
            Destroy(other.gameObject);
            Reset();
        } 
    }
}

function OnTriggerEnter(other:Collider){
    if(other.gameObject.name == "DeathZone"){
        if (life == -1){
            won = false;
            EndLevel(other.gameObject);
        }else {
            life -=1;
            BallStuck();
        } 
    }
    else if(other.gameObject.name == "StartZone" && stuck == false){
        if(timer >= 90){
 			BallStuck();
 		}
 	}
 	else if(other.gameObject.name == "MidField" && timer >= 70){
 		BallStuck();
 	}
 	else if(other.gameObject.name == "EndZone" && timer >= 120){
 		BallStuck();
 	} 
} 

function EndLevel(ch:GameObject){
    EndGame();
    other.audio.Stop();
    other.audio.loop = false;
    if(won){ 
        other.audio.clip = winning;
        other.audio.Play();
        ch.animation.Play("ChestTopAnim");
        yield WaitForSeconds(2.0f);
        var go = Instantiate(map, ch.transform.position,Quaternion.identity); 
        go.transform.Find("Map").animation.Play("Map");
    }else{ 
        other.audio.clip = losing;
        other.audio.Play();
        yield WaitForSeconds(2.0f);
    } 
}

function EndGame(){
    gameObject.renderer.enabled = false;
    BallStuck();
}
