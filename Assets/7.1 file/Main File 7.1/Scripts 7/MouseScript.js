#pragma strict

var SphereSc:SphereScript7;

function Start(){
    SphereSc = GameObject.Find("CannonBall").GetComponent("SphereScript7");
}

function OnMouseEnter(){
    guiText.material.color = Color.black;
}

function OnMouseExit(){
    guiText.material.color = Color.white;
}

function OnMouseUp(){


    SphereSc.EndGame();
    Time.timeScale=1.0;
    yield WaitForSeconds(1.5f);
    
    if(gameObject.tag == "GuiTryCont")
	{
        if(gameObject.guiText.text == "Try Again"){
        	Reset();
            Application.LoadLevel(2);
        }
		else if(gameObject.guiText.text == "Continue"){
			SphereScript7.score = SphereSc.scoreTemp;
            Application.LoadLevel(Application.loadedLevel + 1);
        } 
        /*else if(gameObject.guiText.text == "Continue" && LvlsCount == 1){
        	Application.LoadLevel(4);
        	LvlsCount++;
        }else if(gameObject.guiText.text == "Continue" && LvlsCount == 2){
        	Application.LoadLevel(5);
        	LvlsCount++;
        }else if(gameObject.guiText.text == "Continue" && LvlsCount == 3){
        	Application.LoadLevel(1);
        }*/
	}
    else if(gameObject.name == "GUIMain"){
        SphereSc.EndGame();
        Reset();
        Application.LoadLevel(1);
    }
}

function Reset(){
    SphereSc.scoreTemp = 0;
    SphereSc.life = 3;
}