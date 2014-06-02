//player money
var vMoney : int;
//all items Array
var vItems : cItem[];
//inventory array. 
var vInventory : cItem[];
//number of active slot
var vActiveSlot : int;

var vShopIcon : Texture2D; 
var vBackIcon : Texture2D; 
//shop inventory
var vShopInv : cItem[];
//object hit by raycast
var vHitObj : Transform;

var vMenu : int;
// The position of the scrolling viewport
var scrollPosition : Vector2 = Vector2.zero;
var scrollPosition2 : Vector2 = Vector2.zero;
var scrollPosition3 : Vector2 = Vector2.zero;


var vDay : int;
var vSeason : int;
var vYear : int;

var vCounter : int;

var vSDirt : AudioClip;
var vSSaw : AudioClip;
var vSCash : AudioClip;
var vSStone : AudioClip;

var customSkin : GUISkin;

//the item class
class cItem
{
	var Name : String;
	var Price : int;
	var Icon : Texture2D;
	var Durability : int;
	var Amount : int;
	var Seed : int;
	var Tool : int;
	
}

function Awake()
{
	//set player variables and inventory to hands
	vMoney = 100;
	vMenu = 0;
	
	vDay = 1;
	vSeason = 1;
	vYear = 2000;
	
	for(var k = 0; k < vInventory.length; k++)
	{
		vInventory[k].Name = vItems[0].Name;
		vInventory[k].Price = vItems[0].Price;
		vInventory[k].Icon = vItems[0].Icon;
		vInventory[k].Durability = vItems[0].Durability;
		vInventory[k].Amount = vItems[0].Amount;
		vInventory[k].Seed = vItems[0].Seed;
		vInventory[k].Tool = vItems[0].Tool;
	}
}


function Update ()
{
	//check for clicks and raycast
	if(Input.GetButtonUp("Fire1"))
	{
		Cast();  
	}
	//move or zoom camera
	if (Input.GetMouseButton(1)) 
	{
		var z : float = 2 * Input.GetAxis ("Mouse Y");
		var u : float = 2 * Input.GetAxis ("Mouse X");
		var t : float = 10 * Input.GetAxis("Mouse ScrollWheel");
		transform.Translate(-u,-t,-z, Space.World);
	}
	//switch active inventory slot
	if (Input.GetAxis("Mouse ScrollWheel") < 0) // back
	{
		vActiveSlot--;
		if(vActiveSlot < 0)
		{
			vActiveSlot = vInventory.length-1;
		}
		
	}
	
	if (Input.GetAxis("Mouse ScrollWheel") > 0) // up
	{
		vActiveSlot++;
		if(vActiveSlot == vInventory.length)
		{
			vActiveSlot = 0;
		}
	}
	//progress the ingame clock
	vCounter++;
	if(vCounter >= 100)
	{
		Clock();
		vCounter = 0;
	}
	
}

function Clock()
{
	vDay++;
	gameObject.GetComponent(TileMap).Grow();
	if(vDay >= 30)
	{
		vDay = 1;
		vSeason++;
		
		if(vSeason > 4)
		{
			vSeason = 1;
			vYear++;
			
		}
	}
}
//plays a given sound
function fPlay(ac : AudioClip)
{
	audio.clip = ac;
		audio.Play();
}
//plays a given sound identified by an int. to be used by other scripts
function sPlay(ad : int)
{
	if(ad == 1)
	fPlay(vSDirt);
	
	if(ad == 2)
	fPlay(vSCash);
	
	if(ad == 3)
	fPlay(vSStone);
	
	if(ad == 4)
	fPlay(vSSaw);
}

function OnGUI ()
{
	GUI.skin = customSkin;
	//if not in shop
	if(vMenu == 0)
	{
		//draw shop and equipped icon#
		if(GUI.Button(Rect(10,Screen.height-80,100,75),vShopIcon, "label"))
		{
			vMenu = 1;
			fPlay(vSDirt);
		}
		if(GUI.Button(Rect(Screen.width-110,Screen.height-80,100,75),vInventory[vActiveSlot].Icon, "label"))
		{
			vMenu = 3;
			fPlay(vSDirt);
		}
	}
	else if(vMenu == 1)
	{
		//in shop
		GUI.Box(Rect(-10,Screen.height-105,Screen.width+400,Screen.height+400),"");
		GUI.Label (Rect (Screen.width/2-50, Screen.height-130, 200, 20), "Money:" + vMoney);
		
		if(GUI.Button(Rect(10,Screen.height-180,100,75),vShopIcon, "label"))
		{
			vMenu = 0;
			fPlay(vSDirt);
		}
		if(GUI.Button(Rect(Screen.width-110,Screen.height-180,100,75),vInventory[vActiveSlot].Icon, "label"))
		{
			vMenu = 3;
			fPlay(vSDirt);
		}
		
		scrollPosition = GUI.BeginScrollView (Rect (10,Screen.height-105,Screen.width-20,100),scrollPosition, Rect (0, 0, 1400, 80), true, false);
		
		if(GUI.Button(Rect(0, 0,100,75), vItems[1].Icon, "label"))
		{
			BuyItem(1);
		}
		GUI.Label (Rect (10, 40, 60, 20), vItems[1].Price.ToString());
		
		if(GUI.Button(Rect(110, 0,100,75), vItems[2].Icon, "label"))
		{
			BuyItem(2);
		}
		GUI.Label (Rect (120, 40, 60, 20), vItems[2].Price.ToString());
		
		if(GUI.Button(Rect(220, 0,100,75), vItems[3].Icon, "label"))
		{
			BuyItem(3);
		}
		GUI.Label (Rect (230, 40, 60, 20), vItems[3].Price.ToString());
		if(GUI.Button(Rect(330, 0,100,75), vItems[4].Icon, "label"))
		{
			BuyItem(4);
		}
		GUI.Label (Rect (340, 40, 60, 20), vItems[4].Price.ToString());
		if(GUI.Button(Rect(440, 0,100,75), vItems[5].Icon, "label"))
		{
			BuyItem(5);
		}
		GUI.Label (Rect (450, 40, 60, 20), vItems[5].Price.ToString());
		if(GUI.Button(Rect(550, 0,100,75), vItems[6].Icon, "label"))
		{
			BuyItem(6);
		}
		GUI.Label (Rect (560, 40, 60, 20), vItems[6].Price.ToString());
		if(GUI.Button(Rect(650, 0,100,75), vItems[10].Icon, "label"))
		{
			BuyItem(10);
		}
		GUI.Label (Rect (660, 40, 60, 20), vItems[10].Price.ToString());
		if(GUI.Button(Rect(750, 0,100,75), vItems[12].Icon, "label"))
		{
			BuyItem(12);
		}
		GUI.Label (Rect (760, 40, 60, 20), vItems[12].Price.ToString());
		if(GUI.Button(Rect(850, 0,100,75), vItems[14].Icon, "label"))
		{
			BuyItem(14);
		}
		GUI.Label (Rect (860, 40, 60, 20), vItems[14].Price.ToString());
		if(GUI.Button(Rect(950, 0,100,75), vItems[16].Icon, "label"))
		{
			BuyItem(16);
		}
		GUI.Label (Rect (960, 40, 60, 20), vItems[16].Price.ToString());
		if(GUI.Button(Rect(1050, 0,100,75), vItems[17].Icon, "label"))
		{
			BuyItem(17);
		}
		GUI.Label (Rect (1060, 40, 60, 20), vItems[17].Price.ToString());
		GUI.EndScrollView ();
	}
	else if (vMenu == 2)
	{
		//Sell chest
		GUI.Box(Rect(0,0,Screen.width,120),"");
		GUI.Label (Rect (Screen.width/2-50, Screen.height-20, 200, 20), "Money:" + vMoney);
		
		if(GUI.Button(Rect(Screen.width/2-50, 125,100,75), vBackIcon, "label"))
		{
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		if(GUI.Button(Rect(10,Screen.height-80,100,75),vShopIcon, "label"))
		{
			vMenu = 1;
			fPlay(vSDirt);
		}
		if(GUI.Button(Rect(Screen.width-110,Screen.height-80,100,75),vInventory[vActiveSlot].Icon, "label"))
		{
			vMenu = 3;
			fPlay(vSDirt);
		}
		
		scrollPosition2 = GUI.BeginScrollView (Rect (10,10,Screen.width-20,100),scrollPosition2, Rect (0, 0, 1400, 80), true, false);
		
		if(GUI.Button(Rect(10, 10,100,75), vInventory[0].Icon, "label"))
		{
			SellItem(0);
		}
		GUI.Label (Rect (70, 50, 60, 20), vInventory[0].Price.ToString());
		if(GUI.Button(Rect(110, 10,100,75), vInventory[1].Icon, "label"))
		{
			SellItem(1);
		}
		GUI.Label (Rect (170, 50, 60, 20), vInventory[1].Price.ToString());
		if(GUI.Button(Rect(210, 10,100,75), vInventory[2].Icon, "label"))
		{
			SellItem(2);
		}
		GUI.Label (Rect (270, 50, 60, 20), vInventory[2].Price.ToString());
		if(GUI.Button(Rect(310, 10,100,75), vInventory[3].Icon, "label"))
		{
			SellItem(3);
		}
		GUI.Label (Rect (370, 50, 60, 20), vInventory[3].Price.ToString());
		if(GUI.Button(Rect(410, 10,100,75), vInventory[4].Icon, "label"))
		{
			SellItem(4);
		}
		GUI.Label (Rect (470, 50, 60, 20), vInventory[4].Price.ToString());
		if(GUI.Button(Rect(510, 10,100,75), vInventory[5].Icon, "label"))
		{
			SellItem(5);
		}
		GUI.Label (Rect (570, 50, 60, 20), vInventory[5].Price.ToString());
		if(GUI.Button(Rect(610, 10,100,75), vInventory[6].Icon, "label"))
		{
			SellItem(6);
		}
		GUI.Label (Rect (670, 50, 60, 20), vInventory[6].Price.ToString());
		if(GUI.Button(Rect(710, 10,100,75), vInventory[7].Icon, "label"))
		{
			SellItem(7);
		}
		GUI.Label (Rect (770, 50, 60, 20), vInventory[7].Price.ToString());
		if(GUI.Button(Rect(810, 10,100,75), vInventory[8].Icon, "label"))
		{
			SellItem(8);
		}
		GUI.Label (Rect (870, 50, 60, 20), vInventory[8].Price.ToString());
		if(GUI.Button(Rect(910, 10,100,75), vInventory[9].Icon, "label"))
		{
			SellItem(9);
		}
		GUI.Label (Rect (970, 50, 60, 20), vInventory[9].Price.ToString());

		GUI.EndScrollView ();
	}
	else if(vMenu == 3)
	{
		//inventory
		GUI.Box(Rect(-10,Screen.height-105,Screen.width+400,Screen.height+400),"");
		
		if(GUI.Button(Rect(10,Screen.height-180,100,75),vShopIcon, "label"))
		{
			vMenu = 1;
			fPlay(vSDirt);
		}
		if(GUI.Button(Rect(Screen.width-110,Screen.height-180,100,75),vInventory[vActiveSlot].Icon, "label"))
		{
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		scrollPosition3 = GUI.BeginScrollView (Rect (10,Screen.height-105,Screen.width-20,100),scrollPosition3, Rect (0, 0, 1400, 80), true, false);
		
		if(GUI.Button(Rect(0, 0,100,75), vInventory[0].Icon, "label"))
		{
			vActiveSlot = 0;
			vMenu = 0;
			fPlay(vSDirt);
		}
		if(vInventory[0].Seed == 1)
		{
		GUI.Label (Rect (10, 40, 60, 20), vInventory[0].Amount.ToString());
		}
		
		if(GUI.Button(Rect(110, 0,100,75), vInventory[1].Icon, "label"))
		{
			vActiveSlot = 1;
			vMenu = 0;
			fPlay(vSDirt);
		}
		if(vInventory[1].Seed == 1)
		{
		GUI.Label (Rect (120, 40, 60, 20), vInventory[1].Amount.ToString());
		}
		
		if(GUI.Button(Rect(220, 0,100,75), vInventory[2].Icon, "label"))
		{
			vActiveSlot = 2;
			vMenu = 0;
			fPlay(vSDirt);
		}
		if(vInventory[2].Seed == 1)
		{
		GUI.Label (Rect (230, 40, 60, 20), vInventory[2].Amount.ToString());
		}
		
		if(GUI.Button(Rect(330, 0,100,75), vInventory[3].Icon, "label"))
		{
			vActiveSlot = 3;
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		if(vInventory[3].Seed == 1)
		{
		GUI.Label (Rect (340, 40, 60, 20), vInventory[3].Amount.ToString());
		}
		
		if(GUI.Button(Rect(440, 0,100,75), vInventory[4].Icon, "label"))
		{
			vActiveSlot = 4;
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		if(vInventory[4].Seed == 1)
		{
		GUI.Label (Rect (450, 40, 60, 20), vInventory[4].Amount.ToString());
		}
		
		if(GUI.Button(Rect(550, 0,100,75), vInventory[5].Icon, "label"))
		{
			vActiveSlot = 5;
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		if(vInventory[5].Seed == 1)
		{
		GUI.Label (Rect (560, 40, 60, 20), vInventory[5].Amount.ToString());
		}
		
		if(GUI.Button(Rect(660, 0,100,75), vInventory[6].Icon, "label"))
		{
			vActiveSlot = 6;
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		if(vInventory[6].Seed == 1)
		{
		GUI.Label (Rect (670, 40, 60, 20), vInventory[6].Amount.ToString());
		}
		
		if(GUI.Button(Rect(770, 0,100,75), vInventory[7].Icon, "label"))
		{
			vActiveSlot = 7;
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		if(vInventory[7].Seed == 1)
		{
		GUI.Label (Rect (780, 40, 60, 20), vInventory[7].Amount.ToString());
		}
		
		if(GUI.Button(Rect(880, 0,100,75), vInventory[8].Icon, "label"))
		{
			vActiveSlot = 8;
			vMenu = 0;
			fPlay(vSDirt);
		}
		
		if(vInventory[8].Seed == 1)
		{
		GUI.Label (Rect (890, 40, 60, 20), vInventory[8].Amount.ToString());
		}
		
		if(GUI.Button(Rect(990, 0,100,75), vInventory[9].Icon, "label"))
		{
			vActiveSlot = 9;
			vMenu = 0;
			fPlay(vSDirt);
		}
		if(vInventory[9].Seed == 1)
		{
		GUI.Label (Rect (1000, 40, 60, 20), vInventory[9].Amount.ToString());
		}
		
		GUI.EndScrollView ();
		
	}
}
//sells an item 
function SellItem(it : int)
{
	if(vInventory[it].Name != "Hands")
			{
				if(vInventory[it].Tool == 0)
				{
				vMoney = vMoney + vInventory[it].Price/2;
				if(vInventory[it].Amount >= 2)
				{
					vInventory[it].Amount--;
				}
				else
				{
					SetEmpty(it);
				}
				}
				else
				{
				vMoney = vMoney + vInventory[it].Price/2;
				SetEmpty(it);
				}
				
				
				
				
				fPlay(vSCash);
			}
			else
			{
			fPlay(vSDirt);
			}
}
//sets an inventory slot to hands
function SetEmpty(itt : int)
{
vInventory[itt].Name = vItems[0].Name;
				vInventory[itt].Price = vItems[0].Price;
				vInventory[itt].Icon = vItems[0].Icon;
				vInventory[itt].Durability = vItems[0].Durability;
				vInventory[itt].Amount = vItems[0].Amount;
				vInventory[itt].Seed = vItems[0].Seed;
				vInventory[itt].Tool = vItems[0].Tool;
}
//buys an item if the player has enough money and space in inventory
function BuyItem(item : int)
{
if(vMoney < vItems[item].Price)
	{
	fPlay(vSDirt);
	}
	else if(vMoney >= vItems[item].Price)
	{
		for(var l = 0; l < vInventory.length; l++)
		{
			if(vItems[item].Seed == 1 && vItems[item].Name == vInventory[l].Name)
			{
				vMoney = vMoney - vItems[item].Price;
				vInventory[l].Amount = vInventory[l].Amount + vItems[item].Amount;
				fPlay(vSCash);
				break;
			}
			else if(vInventory[l].Name == "Hands")
			{
				vMoney = vMoney - vItems[item].Price;
				
				vInventory[l] = new cItem();
				vInventory[l].Name = vItems[item].Name;
				vInventory[l].Price = vItems[item].Price;
				vInventory[l].Icon = vItems[item].Icon;
				vInventory[l].Durability = vItems[item].Durability;
				vInventory[l].Amount = vItems[item].Amount;
				vInventory[l].Seed = vItems[item].Seed;
				vInventory[l].Tool = vItems[item].Tool;
				fPlay(vSCash);
				vActiveSlot = l;
				break;
			}
		}
	}
}
//adds free item to inventory as long as space is available
function Harvest(itm : int)
{
	for(var h = 0; h < vInventory.length; h++)
	{
		if(vInventory[h].Name == "Hands")
		{
			
			vInventory[h] = new cItem();
			vInventory[h].Name = vItems[itm].Name;
			vInventory[h].Price = vItems[itm].Price;
			vInventory[h].Icon = vItems[itm].Icon;
			vInventory[h].Durability = vItems[itm].Durability;
			vInventory[h].Amount = vItems[itm].Amount;
			vInventory[h].Seed = vItems[itm].Seed;
			vInventory[h].Tool = vItems[itm].Tool;
			fPlay(vSCash);
			return true;
		}
	}
}
//raycasts and sends a message to the hit object. sending a horse head did not work, reverted back to string.
function Cast()
{
	if(vMenu == 1 && Input.mousePosition.y <= 100)
	{
		return;
	}
	else if(vMenu != 2)
	{
		var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		var hit : RaycastHit;
		if (Physics.Raycast (ray, hit, 1000))
		{
			
			Debug.DrawLine (this.transform.position, hit.point);
			vHitObj = hit.collider.transform;
			vHitObj.SendMessage ("OnHit", vInventory[vActiveSlot]);
			
			
		}
	}
}
//decreases tool durability an deletes the tool if dur. runs out
function Durability()
{
	if(vInventory[vActiveSlot].Seed == 0)
	{
		if(vInventory[vActiveSlot].Name != "Hands")
		{
			vInventory[vActiveSlot].Durability--;
		}
		if(vInventory[vActiveSlot].Durability <= 0)
		{
			if(vInventory[vActiveSlot].Name != "Hands")
			{
				vInventory[vActiveSlot].Name = vItems[0].Name;
				vInventory[vActiveSlot].Price = vItems[0].Price;
				vInventory[vActiveSlot].Icon = vItems[0].Icon;
				vInventory[vActiveSlot].Durability = vItems[0].Durability;
				vInventory[vActiveSlot].Amount = vItems[0].Amount;
				vInventory[vActiveSlot].Seed = vItems[0].Seed;
				vInventory[vActiveSlot].Tool = vItems[0].Tool;
			}
		}
	}

	if(vInventory[vActiveSlot].Seed == 1)
	{
		if(vInventory[vActiveSlot].Name != "Hands")
		{
			vInventory[vActiveSlot].Amount--;
		}
		if(vInventory[vActiveSlot].Amount <= 0)
		{
			if(vInventory[vActiveSlot].Name != "Hands")
			{
				vInventory[vActiveSlot].Name = vItems[0].Name;
				vInventory[vActiveSlot].Price = vItems[0].Price;
				vInventory[vActiveSlot].Icon = vItems[0].Icon;
				vInventory[vActiveSlot].Durability = vItems[0].Durability;
				vInventory[vActiveSlot].Amount = vItems[0].Amount;
				vInventory[vActiveSlot].Seed = vItems[0].Seed;
				vInventory[vActiveSlot].Tool = vItems[0].Tool;
			}
		}
	}
}