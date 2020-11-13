#pragma strict

var mesh : Mesh;
var scale : float = 1000.0;
var segments : int = 8;
var amplitude : float = 3.0;
var velocity : float = 2.0;

private var vertices : Vector3[];
private var uvs : Vector2[];
private var triangles : int[];

private var currentSegs;

function Start()
{

mesh = gameObject.GetComponent(MeshFilter).mesh;


ResetMesh();

}

function ResetMesh()
{
    mesh.Clear();

    if (segments < 1)
    segments = 1;

    if (segments > 254)
    segments = 254;

    vertices = new Vector3[(segments+1)*(segments+1)];
    uvs = new Vector2[(segments+1)*(segments+1)];
    triangles = new int[segments*segments*2*3];

    currentSegs = segments;
}

function Update()
{

    if(currentSegs != segments)
    {
        ResetMesh();
    }
    else
    {

        transform.localScale = new Vector3(scale, 1, scale);
        transform.position.x = -scale * 0.5;
        transform.position.z = scale * 0.5;

        var x = 0;
        var z = 0;
        for (var v = 0; v < vertices.Length; v++) 
        {
            vertices[v] = Vector3(x * (scale/segments) , amplitude * Mathf.Cos(0.5 * Time.time * velocity + 0.5 * v), z * (scale/segments));
            if (z < segments) {
                z++;
            }
            else {
                z = 0;
                x++;
            }
        }


        for (var u = 0; u < uvs.Length; u++)
        {
            uvs[u] = Vector2 (vertices[u].x/scale, vertices[u].z/scale);
        }

        var triSlot = 0;
        var vertIndex = 0;
        
        for (var i = 0; i < segments; i++) 
        {
            for (var j = 0; j < segments; j++) 
            {
                vertIndex = j + i * (segments + 1);
                
                //first triangle of segment
                triangles[triSlot++] = vertIndex;
                triangles[triSlot++] = vertIndex + 1;
                triangles[triSlot++] = vertIndex + segments + 2;
                
                //second triangle of segment
                triangles[triSlot++] = vertIndex;
                triangles[triSlot++] = vertIndex + segments + 2;
                triangles[triSlot++] = vertIndex + segments + 1;
            }
        }


        mesh.vertices = vertices;
        mesh.uv = uvs;
        mesh.triangles = triangles;
        mesh.RecalculateBounds();
        mesh.RecalculateNormals();
    }
}