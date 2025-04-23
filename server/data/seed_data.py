import random
from datetime import datetime
from app import app, db
from models.formula import Formula, Ingredient, FormulaIngredient

# List of possible ingredients
ingredient_names = [
    "Sodium Chloride", "Potassium Chloride", "Calcium Carbonate", "Magnesium Oxide",
    "Zinc Sulfate", "Iron Oxide", "Copper Sulfate", "Vitamin A", "Vitamin B1",
    "Vitamin B2", "Vitamin B6", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E",
    "Folic Acid", "Niacin", "Biotin", "Pantothenic Acid", "Riboflavin", "Thiamine",
    "Phosphorus", "Iodine", "Manganese", "Selenium", "Chromium", "Molybdenum"
]

# Units of measurement
units = ["mg", "g", "mcg", "IU", "mL"]

def seed_database():
    # Clear existing data
    db.drop_all()
    db.create_all()
    
    # Create ingredients
    ingredients = []
    for name in ingredient_names:
        ingredient = Ingredient(name=name)
        db.session.add(ingredient)
        ingredients.append(ingredient)
    
    db.session.commit()
    
    # Create formulas with ingredients
    for i in range(1, 21):
        formula = Formula(
            formulation_number=f"F{i:03d}",
            name=f"Formula {i}",
            description=f"This is a description for Formula {i}. It contains various ingredients in specific amounts."
        )
        db.session.add(formula)
        db.session.commit()
        
        # Add 4-8 random ingredients to each formula
        num_ingredients = random.randint(4, 8)
        selected_ingredients = random.sample(ingredients, num_ingredients)
        
        for ingredient in selected_ingredients:
            amount = round(random.uniform(0.1, 500), 2)
            unit = random.choice(units)
            
            formula_ingredient = FormulaIngredient(
                formula_id=formula.id,
                ingredient_id=ingredient.id,
                amount=amount,
                unit=unit
            )
            db.session.add(formula_ingredient)
    
    db.session.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    with app.app_context():
        seed_database()
