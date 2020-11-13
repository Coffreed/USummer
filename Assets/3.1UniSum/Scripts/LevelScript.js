#pragma strict

var mesh:Mesh;
var vertices:Vector3[];

/*function Start () {
    mesh= gameObject.GetComponent(MeshFilter).mesh;
    vertices=mesh.vertices;
    for(var i = 0; i<vertices.Length; i++){
        vertices[i].y = Random.Range(0,11);
    }
    mesh.vertices =vertices;
    mesh.RecalculateBounds();
    mesh.RecalculateNormals();
    gameObject.AddComponent(MeshCollider); 
}*/

function Start () {
    mesh= gameObject.GetComponent(MeshFilter).mesh;
    vertices=mesh.vertices;
    gameObject.AddComponent(MeshCollider); 
}
function Update(){
    for(var v = 0;v<vertices.Length;v++)
        vertices[v].y = 2*Mathf.Cos(0.5*Time.time+0.5*v);
    mesh.vertices = vertices;
    mesh.RecalculateBounds();
    mesh.RecalculateNormals();
}