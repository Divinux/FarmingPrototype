//the position of this tile
var vPosX : int;
var vPosY : int;
//all possible tile states
var vContent : cTile[];
//the current state of this tile
var vState : cTile;
//the int pointer to the current state
var vCurr : int;
//the model gameobject
var vMesh : GameObject;
//random number
var RNG : int;
//reference components
var vCam : GameObject;
var vPl : Component;
var vTm : Component;

var b : Component;
//wet and dry textures for tilled land
var vWet : Material;
var vDry : Material;

var script : Component;
var vTempWater : int;

function Awake()
{
	//set state to a random wild tile
	RNG = Random.Range(0,4);
	if(RNG == 3)
	{
		RNG = 9;
	}
	ChangeState(RNG);
	vCurr = RNG;
	//find all needed objects
	vCam = gameObject.FindWithTag("MainCamera");
	vPl = vCam.GetComponent("Player");
	vTm = vCam.GetComponent("TileMap");
	
	
}
//changes the state of the tile
function ChangeState(i : int)
{
	if(vState.vWaterCounter > 0)
	{
		vTempWater = vState.vWaterCounter;
	}

	vState.vStatus = vContent[i].vStatus;
	vState.vMesh = vContent[i].vMesh;
	vState.vGrowth = vContent[i].vGrowth;
	vState.vTimer = vContent[i].vTimer;
	vState.vProduct = vContent[i].vProduct;
	vState.vTree = vContent[i].vTree;
	vState.vDmg = vContent[i].vDmg;
	vState.vWaterCounter = vContent[i].vWaterCounter;
	
	
	
	Destroy(vMesh);
	vMesh = Instantiate(vContent[i].vMesh, transform.position, transform.rotation);
	vMesh.transform.parent = transform;
	
	script = gameObject.GetComponentInChildren(Ref);
	if(script != null)
	{
		b = script;
		b = b.gameObject.GetComponent(MeshRenderer);
		
	}
	if(vTempWater > 0)
	{
		vState.vWaterCounter = vTempWater;
		vTempWater = 0;
		Dry();
	}
	
	vCurr = i;
}
//tile class
class cTile
{
	var vStatus : String;
	var vMesh : GameObject;
	var vGrowth : int;
	var vTimer : int;
	var vProduct : int;
	var vTree : int;
	var vDmg : int;
	var vWaterCounter : int;
}

//function that receives player interactions and behaves according to tile state and used tool
function OnHit(tool : cItem)
{
	if(tool.Name == "Hoe")
	{
		if(vState.vStatus == "Empty" || vState.vStatus == "Wild")
		{
			vPl.sPlay(1);
			vPl.Durability();
			ChangeState(6);
		}
	}
	if(tool.Name == "Hammer")
	{
		if(vState.vStatus == "Rock")
		{
			vPl.sPlay(3);
			vPl.Durability();
			vState.vDmg--;
			if(vState.vDmg <= 0)
			{
				ChangeState(0);
			}
		}
	}
	if(tool.Name == "Water Can")
	{
		vPl.Durability();
		vState.vWaterCounter = vState.vWaterCounter + 10;
		if(vState.vWaterCounter <= 0)
		{
			vState.vTimer = vState.vTimer - 10;
			vTm.Wet(gameObject);
			Dry();
		}
	}
	if(tool.Name == "Saw")
	{
		if(vState.vTree != 0)
		{
			vPl.sPlay(4);
			vPl.Durability();
			vState.vDmg--;
			if(vState.vDmg <= 0)
			{
				if(vPl.Harvest(vState.vProduct) == true)
				{
					ChangeState(0);
				}
			}
		}
	}
	if(tool.Name == "Scythe")
	{
		vPl.Durability();
		if(vState.vStatus == "Wild")
		{
			ChangeState(0);
			vPl.sPlay(1);
		}
		
		if(vState.vProduct != 0 && vState.vTree == 0)
		{
			if(vPl.Harvest(vState.vProduct) == true)
			{
				ChangeState(0);
				vPl.sPlay(1);
			}
		}
	}
	if(vCurr == 7)
	{
		vPl.vMenu = 2;
	}
	if(tool.Name == "Wheat Seeds")
	{
		if(vState.vStatus == "LandTilled")
		{
			vPl.Durability();
			ChangeState(3);
			Dry();
			vPl.sPlay(1);
		}
	}
	if(tool.Name == "Cabbage Seeds")
	{
		if(vState.vStatus == "LandTilled")
		{
			vPl.Durability();
			ChangeState(13);
			Dry();
			vPl.sPlay(1);
		}
	}
	
	if(tool.Name == "Carrot Seeds")
	{
		if(vState.vStatus == "LandTilled")
		{
			vPl.Durability();
			ChangeState(16);
			Dry();
			vPl.sPlay(1);
		}
	}
	
	if(tool.Name == "Melon Seeds")
	{
		if(vState.vStatus == "LandTilled")
		{
			vPl.Durability();
			ChangeState(19);
			Dry();
			vPl.sPlay(1);
		}
	}
	if(tool.Name == "Potato")
	{
		if(vState.vStatus == "LandTilled")
		{
			vPl.Durability();
			ChangeState(22);
			Dry();
			vPl.sPlay(1);
		}
	}
	if(tool.Name == "Tomato Seeds")
	{
		if(vState.vStatus == "LandTilled")
		{
			vPl.Durability();
			ChangeState(25);
			Dry();
			vPl.sPlay(1);
		}
	}
}

//switches to the next possible state
function NextState()
{
	ChangeState(vCurr+1);
}

//dries out the tile if it was watered
function Dry()
{
	vState.vWaterCounter--;
	
	if(b != null)
	{
		WetC();
	}
	else
	{
		script = gameObject.GetComponentInChildren(Ref);
		b = script;
		b = b.gameObject.GetComponent(MeshRenderer);
		WetC();
	}
}

function WetC()
{
	//if its wet but should be dry
	if(vState.vWaterCounter <= 0)
	{
		b.material = vDry;
		vState.vWaterCounter = 0;
	}
	if(vState.vWaterCounter > 0)
	{
		b.material = vWet;
	}
}

