#pragma strict

class BoatLevelScript extends MonoBehaviour
{
    var chest: Transform;
    var chests = new Transform[36];
    var chestY:float;

    static var chestCount : int =0;

    function Start()
    {
        CreateChests();
    }

    function CreateChests()
    {
        var index : int = 0;
    
        for (var z:int = 0; z>=-6; z=z-2)
        {
            for (var x:int = 0;x<=16;x = x+2)
            {
                var go =Instantiate(chest, Vector3(x, chestY, z),new Quaternion(0,180,0,0));
                chests[index] = go;
                index++;
            }
        }

        chestCount = chests.Length;
    }
}