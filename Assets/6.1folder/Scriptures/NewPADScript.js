#pragma strict

var other:Camera;
var minPos:float;
var maxPos:float;
static var mouseSensitivity:int;
var cannon: GameObject;
var cannonOn:boolean;
var extraBall: Rigidbody;
var fireBall:Rigidbody;
var spawn:Transform;
var speed:float;
var shoot:AudioClip;
var shotCount:int;
var tweak :boolean;
var tweakTime:int;
var timeZero:float;
var amplitude:float;
var omega:float;
var startPos:float;
var fireParticle: GameObject;

function Start(){
    other = FindObjectOfType(Camera);
    mouseSensitivity = 2;
    cannon = GameObject.Find("Cannon");
    cannon.SetActiveRecursively(false);
    spawn = transform.Find("Spawn").transform; 
    shotCount =0; 
    tweak = false;
    startPos = transform.position.z;
    other.audio.loop=true;
}

function Update () { 
    var hit : RaycastHit;
    if(Physics.Raycast(other.ScreenPointToRay(Vector3(Input.mousePosition.x, Screen.height / (mouseSensitivity+1),0)), hit)){
        if(hit.point.x<maxPos && hit.point.x>minPos) 
            transform.position.x = hit.point.x;
        else if(hit.point.x>maxPos) 
            transform.position.x = maxPos;
        else if(hit.point.x<minPos) 
            transform.position.x = minPos;
    }
    if(cannonOn){ 
        if(cannon.active&& shotCount!=5){
            if(Input.GetMouseButtonDown(0)&& !cannon.animation.isPlaying){
                var go =Instantiate(fireBall, spawn.position, Quaternion.identity);
                go.rigidbody.AddForce(Vector3.forward*speed);
                AudioSource.PlayClipAtPoint(shoot, spawn.position);
                cannon.animation.Play("CannonAnimation");
                Instantiate(fireParticle,spawn.position,Quaternion.identity);
                shotCount++;
            }
        }else if (shotCount == 5 && !cannon.animation.isPlaying){
            cannon.SetActiveRecursively(false);
            shotCount =0;
            cannonOn = false;
        }
    }
    if(tweak){
        var tweakComp = Time.time;
        if(tweakComp < tweakTime){
            var delay = Time.time-timeZero;
            transform.position.z = startPos+amplitude*(-Mathf.Cos(omega*delay)+1);
        }else{
            if(transform.position.z >= startPos)
                transform.position.z = transform.position.z-1*Time.deltaTime;
            else
            tweak=!tweak;
        }
    } 
}

function OnTriggerEnter(other :Collider){
    if(other.gameObject.tag == "PowerUp"){
        var choice:int = Random.Range(0, 2);
        switch(choice){
            case 0: 
            var pos = transform.Find("Stuck").transform.position;
            Instantiate(extraBall,pos, Quaternion.identity); 
            Destroy(other.gameObject);
            break;
            case 1:
            cannon.SetActiveRecursively(true);
            Destroy(other.gameObject);
            cannonOn = true;
            break; 
            case 2:
            tweak = true;
            tweakTime = Time.time +10;
            timeZero = Time.time;
            Destroy(other.gameObject);
            break; 
        }
    }
}