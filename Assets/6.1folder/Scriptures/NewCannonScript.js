#pragma strict

var impact:AudioClip;
var go:GameObject;
var scoreSc:NewSphereScript;
var chestExp : GameObject;

function Start(){
    go = GameObject.Find("CannonBall");
    scoreSc = go.GetComponent("NewSphereScript");
}

function OnCollisionEnter(other:Collision){
    if(other.gameObject.tag == "Chest"){
        AudioSource.PlayClipAtPoint(impact,transform.position,0.5f);
        NewSphereScript.chestCount -= 1;
        Instantiate(chestExp,transform.position,Quaternion.identity);
        if(NewSphereScript.chestCount == 0){
            Destroy(gameObject);
            go.SendMessage("EndLevel",other.gameObject);
        }else{
            Destroy(gameObject);
            Destroy(other.gameObject); 
        }
    }else if(other.gameObject.tag == "Side"){ 
        Destroy(gameObject); 
    }else if(other.gameObject.tag == "Back"){ 
        Destroy(gameObject); 
    }
}