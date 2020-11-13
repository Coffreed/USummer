#pragma strict

var other:Camera;
var next:boolean;

function Start(){
    other = FindObjectOfType(Camera);
    other.audio.volume = 1;
    next =false; 
}

function Update(){ 
    if(next){
        other.audio.volume -= Time.deltaTime;
        if(other.audio.volume <=0){
            Application.LoadLevel(2);
        }
    }
}

function OnMouseEnter(){
    renderer.material.color = Color.black;
}

function OnMouseExit(){
    renderer.material.color = Color.white;
}

function OnMouseOver(){
    if(Input.GetMouseButtonDown(0)){
        if(gameObject.tag == "Play"){
            audio.Play();
            next = true;
        }else if(gameObject.tag == "Quit"){
            if (Application.platform == RuntimePlatform.WindowsPlayer||Application.platform == RuntimePlatform.OSXPlayer)
            Application.Quit();
        }
    }
}