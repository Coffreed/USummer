#pragma strict

var engine:AudioClip;
var brake:AudioClip;
var fadeOut:boolean = false;

function Engine() {
    audio.clip = engine;
    audio.Play();
}

function Break() {
    audio.clip = brake;
    audio.Play();
}

function StopSound(){
    audio.Stop();
    renderer.material.color.a-=Time.deltaTime;
}

function Update(){
    if(fadeOut){
        renderer.material.color.a -=Time.deltaTime;
        if(renderer.material.color.a<0.01)
            Application.LoadLevel(1);
    }
}

function FadeOut(){
    fadeOut = true;
}