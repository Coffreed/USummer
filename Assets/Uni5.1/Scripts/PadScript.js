#pragma strict

var other:Camera;
var minPos:float;
var maxPos:float;

function Start(){
    other = FindObjectOfType(Camera);
}

function Update () { 
    var hit : RaycastHit;
    if(Physics.Raycast(other.ScreenPointToRay(Input.mousePosition), hit)){
        if(hit.point.x<maxPos && hit.point.x>minPos) 
            transform.position.x = hit.point.x;
        else if(hit.point.x>maxPos) 
            transform.position.x = maxPos;
        else if(hit.point.x<minPos) 
            transform.position.x = minPos;
    }
}