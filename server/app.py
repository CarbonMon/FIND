from flask import Flask, request, jsonify
from flask_cors import CORS
from models.formula import db, Formula, Ingredient, FormulaIngredient
from sqlalchemy import and_

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///formulas.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/api/formulas', methods=['GET'])
def get_formulas():
    formulas = Formula.query.all()
    result = []
    for formula in formulas:
        formula_data = {
            'id': formula.id,
            'formulation_number': formula.formulation_number,
            'name': formula.name,
            'description': formula.description,
            'ingredients': []
        }
        
        for formula_ingredient in formula.ingredients:
            ingredient = Ingredient.query.get(formula_ingredient.ingredient_id)
            formula_data['ingredients'].append({
                'name': ingredient.name,
                'amount': formula_ingredient.amount,
                'unit': formula_ingredient.unit
            })
        
        result.append(formula_data)
    
    return jsonify(result)

@app.route('/api/formulas/search', methods=['GET'])
def search_formulas():
    ingredient_name = request.args.get('ingredient')
    min_amount = request.args.get('min_amount')
    max_amount = request.args.get('max_amount')
    
    query = Formula.query.join(FormulaIngredient).join(Ingredient)
    
    filters = []
    if ingredient_name:
        filters.append(Ingredient.name.ilike(f'%{ingredient_name}%'))
    
    if min_amount and max_amount:
        filters.append(and_(FormulaIngredient.amount >= float(min_amount), 
                           FormulaIngredient.amount <= float(max_amount)))
    elif min_amount:
        filters.append(FormulaIngredient.amount >= float(min_amount))
    elif max_amount:
        filters.append(FormulaIngredient.amount <= float(max_amount))
    
    if filters:
        query = query.filter(*filters)
    
    formulas = query.all()
    # Format results similar to get_formulas()
    # ...

    return jsonify(result)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
