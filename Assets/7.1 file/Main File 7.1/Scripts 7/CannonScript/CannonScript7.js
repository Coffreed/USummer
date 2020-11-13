#pragma strict

var impact:AudioClip;
var go:GameObject;
var scoreSc:SphereScript7;
var chestExp : GameObject;

function Start(){
    go = GameObject.Find("CannonBall"); //Modify this line
    scoreSc = GameObject.Find("CannonBall").GetComponent("SphereScript7");
}

function OnCollisionEnter(other:Collision){
    if(other.gameObject.tag == "Chest"){
        AudioSource.PlayClipAtPoint(impact, other.transform.position,1.0f); 
        scoreSc.scoreTemp += 10;
        scoreSc.UpdateScore();
        SphereScript7.chestCount -=1;
        Instantiate(chestExp,transform.position,Quaternion.identity);
        if(SphereScript7.chestCount == 0){
            Destroy(gameObject);
            go.SendMessage("EndLevel",other.gameObject);
        }else{
            Destroy(other.gameObject);
            Destroy(gameObject); 
        }
    }else if(other.gameObject.tag == "Side"){ 
        Destroy(gameObject); 
    }
}
