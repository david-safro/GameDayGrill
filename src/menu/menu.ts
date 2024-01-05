export interface MenuItem {
	name: string;
	price: number;
	description: string;
	ingredients: string[];
}

export interface MenuCategory {
	[key: string]: MenuItem;
}

export interface Menu {
	[key: string]: MenuCategory;
}

const jsonData: Menu = {
	"beverages": {

			"soda": {
				"name": "Soda",
				"price": 1.99,
				"description": "Refreshing carbonated beverage",
				"ingredients": ["carbonated water", "sweetener", "flavorings"]
			},
			"water": {
				"name": "Water",
				"price": 0.99,
				"description": "Still or sparkling",
				"ingredients": ["purified water"]
			},
			"beer": {
				"name": "Beer",
				"price": 4.99,
				"description": "Classic brewed beer",
				"ingredients": ["water", "barley", "hops", "yeast"]
			},
			"wine": {
				"name": "Wine",
				"price": 7.99,
				"description": "Red or white",
				"ingredients": ["grapes"]
			}

	},
	"appetizers": {
		"guacamole": {
			"name": "Guacamole",
			"price": 5.99,
			"description": "Freshly made avocado dip",
			"ingredients": ["avocado", "tomato", "onion", "cilantro", "lime"]
		},
		"wings": {
			"name": "Chicken Wings",
			"price": 8.99,
			"description": "Spicy buffalo wings",
			"ingredients": ["chicken wings", "hot sauce", "butter"]
		}
	},
	"entrees": {

			"sushi": {
				"name": "Sushi",
				"price": 12.99,
				"description": "Assorted sushi rolls",
				"ingredients": ["rice", "fish", "seaweed", "vegetables", "soy sauce"]
			},
			"curry": {
				"name": "Chicken Curry",
				"price": 10.99,
				"description": "Spicy and flavorful curry",
				"ingredients": ["chicken", "curry sauce", "vegetables", "rice"]
			},
			"steak": {
				"name": "Filet Mignon",
				"price": 20.99,
				"description": "Tender and juicy steak",
				"ingredients": ["beef", "salt", "pepper"]
			},
			"pasta": {
				"name": "Spaghetti",
				"price": 14.99,
				"description": "Classic pasta with marinara sauce",
				"ingredients": ["pasta", "tomato sauce", "herbs", "cheese"]
			}

	},
	"sides": {
		"fries": {
			"name": "French Fries",
			"price": 3.99,
			"description": "Crispy golden fries",
			"ingredients": ["potatoes", "oil", "salt"]
		},
		"salad": {
			"name": "Caesar Salad",
			"price": 5.99,
			"description": "Fresh greens with Caesar dressing",
			"ingredients": ["lettuce", "croutons", "Parmesan cheese", "Caesar dressing"]
		}
	},
	"desserts": {
		"cheesecake": {
			"name": "Cheesecake",
			"price": 7.99,
			"description": "Creamy and delicious cheesecake",
			"ingredients": ["cream cheese", "sugar", "eggs", "vanilla"]
		},
		"iceCream": {
			"name": "Ice Cream",
			"price": 4.99,
			"description": "Assorted flavors",
			"ingredients": ["cream", "sugar", "flavorings"]
		}
	}
};

export function getMenu() {
	return jsonData;
}
export default jsonData;
