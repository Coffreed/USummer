#pragma strict

var guiIntro:GUIText;
static var play:boolean;
var guiScore:GUIText;
var guiLives:GUIText;
var timer : float;
var stuckPos:Transform;
private var velocity:Vector3;
var speed :float;
static var life :int = 3;
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
var guiTryCont:GameObject;
var guiMain:GameObject;
var sliderOn:boolean;
var myFont:Font;


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
    guiTryCont = GameObject.FindWithTag("GuiTryCont");
    guiMain = GameObject.FindWithTag("GuiMain");
    sliderOn=false;
    guiTryCont.active = false;
    guiMain.active =false;
    guiScore = GameObject.FindWithTag("GuiScore").guiText;
    guiLives = GameObject.FindWithTag("GuiLives").guiText;
    UpdateScore();
    UpdateLives();
    guiIntro = GameObject.FindWithTag("GuiIntro").guiText;
    play =true;
}

function FixedUpdate(){
    rigidbody.MovePosition(rigidbody.position + velocity);
}

function Update(){
	timer++;
    if(stuck){
    	if(play){
        	if( Input.GetMouseButtonDown(1)){
            	transform.parent = null;
            	rigidbody.isKinematic = false;
            	velocity = Vector3(0,0,speed);
            	stuck = false;
            	Reset();
        	}
        }
    }
    if(Input.GetKeyDown(KeyCode.P))Pause();
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
        UpdateScore();
        AudioSource.PlayClipAtPoint(ouch,transform.position,0.5f);
        if(chestCount == 0)
            EndLevel(other.gameObject);
        else{
            velocity = velocity- 2 * norm * Vector3.Dot(velocity, norm.normalized);
            velocity.y = 0; 
            AudioSource.PlayClipAtPoint(chestSound,transform.position,0.5f);
            count++;
            if (count == 6){
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
        }else{
            life -=1;
            UpdateLives();
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
    play = false;
    other.audio.Stop();
    other.audio.loop = false;
    if(won){ 
        other.audio.clip = winning;
        other.audio.Play();
        ch.animation.Play("ChestTopAnim");
        yield WaitForSeconds(2.0f);
        var go = Instantiate(map, ch.transform.position,Quaternion.identity); 
        go.transform.Find("Map").animation.Play("Map");
        guiIntro.text = "You won!!"; 
        guiIntro.animation["GuiAnimation"].speed = -1.0;
        guiIntro.animation["GuiAnimation"].time = guiIntro.animation["GuiAnimation"].length;
        guiIntro.animation.Play("GuiAnimation");
        yield WaitForSeconds(2.0f);
    	guiTryCont.active = true;
    	guiTryCont.guiText.text = "Continue";
    	guiMain.active =true;
    }else{ 
        other.audio.clip = losing;
        other.audio.Play();
        yield WaitForSeconds(2.0f);
        guiIntro.text = "You lost!!"; 
        guiIntro.animation["GuiAnimation"].speed = -1.0;
        guiIntro.animation["GuiAnimation"].time = guiIntro.animation["GuiAnimation"].length;
        guiIntro.animation.Play("GuiAnimation");
        yield WaitForSeconds(2.0f);
    	guiTryCont.active = true;
    	guiTryCont.guiText.text = "TryAgain";
    	guiMain.active =true;
    } 
}

function EndGame(){
    gameObject.renderer.enabled = false;
    BallStuck();
}

function Pause(){
    if(play){
        Time.timeScale = 0.0;
        other.audio.Pause();
    }else{
        Time.timeScale = 1.0;
        other.audio.Play();
    }
    play=!play; 
    sliderOn = !sliderOn;
    guiTryCont.active = !guiTryCont.active;
    guiTryCont.guiText.text = "Try Again";
    guiMain.active=!guiMain.active;
}

function UpdateScore(){
    var sc = score + scoreTemp;
    guiScore.text = "SCORE: " + sc;
}

function UpdateLives(){
    var lifeGui:int = life +1; 
    guiLives.text = "LIVES: " + lifeGui;
}

function OnGUI() {
    if(sliderOn){
        GUI.skin.font = myFont;
        GUILayout.BeginArea (Rect (Screen.width/2-200/2, Screen.height/2, 300, 200));
        GUILayout.Label("Mouse Sensitivity");
        PadScript7.mouseSensitivity = GUILayout.HorizontalSlider ( PadScript7.mouseSensitivity, 1, 20);
        GUILayout.Label(PadScript7.mouseSensitivity.ToString());
        GUILayout.EndArea ();
    }
}