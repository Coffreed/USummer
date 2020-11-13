#pragma strict

private var speed:float = 4.0f;

function Update () {
    transform.position.z -= speed*Time.deltaTime;
}

function OnTriggerEnter(other:Collider){
    if(other.gameObject.tag == "DeathZone"){
        Destroy(gameObject);
    }
}