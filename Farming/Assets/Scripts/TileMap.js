//prefab for the tileobject that spawns one tile and changes states
var vTileObj : GameObject;

//var vRef : GameObject;
//the size of the area to be generated
var vSizeX : int;
var vSizeY : int;
//teh array that holds all instantiated tiles
var vTileArray : Tiles[];
//counter that goes through the array on instantiation
var vArrCounter : int;
//the parent of all tiles
var vParent : GameObject;
//tile component for loop
var a : Component;




class Tiles
{
	var vObj : GameObject;
	var vX : int;
	var vY : int;
}

function Awake () 
{
	//reset counter and make new array
	vArrCounter = 0;
	vTileArray = new Tiles[vSizeX * vSizeY];
	
	
	for(var k = 0; k < vTileArray.length; k++)
	{
		vTileArray[k] = new Tiles();
	}
	//instantiate one tile for each position
	for(var n = 0; n < vSizeY; n++)
	{
		for(var m = 0; m < vSizeX; m++)
		{
			vTileArray[vArrCounter].vObj = Instantiate(vTileObj, new Vector3(m, 0, n), Quaternion.identity);
			vTileArray[vArrCounter].vX = m;
			vTileArray[vArrCounter].vY = n;
			vTileArray[vArrCounter].vObj.transform.parent = vParent.transform;

			vArrCounter++;
		}
	}
	//set the first tile to sellng chest
	vTileArray[0].vObj.GetComponent(Tile).ChangeState(7);

}

function Grow()
{
	//grow each tile
	for(var j = 0; j < vTileArray.length; j++)
	{
		a = vTileArray[j].vObj.GetComponent(Tile);
		if(a.vState.vGrowth == 1)
		{
			a.vState.vTimer = a.vState.vTimer - 1;
			if(a.vState.vTimer == 0)
			{
				a.NextState();
			}
		}
		
		if(a.vState.vStatus == "Empty")
		{
			a.vState.vTimer = a.vState.vTimer - 1;
			if(a.vState.vTimer == 0)
			{
				a.NextState();
			}
		}
		
		if(a.vState.vWaterCounter > 0)
		{
		a.Dry();
		}
		
		
		
		
	}
}




