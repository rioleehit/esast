import { BlockStatement, Declaration, ExpressionStatement, Identifier, Literal,
	NewExpression, ReturnStatement, Statement, ThrowStatement } from './ast'
import mangleIdentifier, { needsMangle, propertyNameOk } from './mangle-identifier'
import { functionExpressionThunk, memberExpression } from './specialize'

const specialNameToId = new Map()
const propertyToIdOrLiteral = new Map()

export const
	idCached = name => {
		let _ = specialNameToId.get(name)
		if (_ === undefined) {
			_ = Identifier(mangleIdentifier(name))
			specialNameToId.set(name, _)
		}
		return _
	},

	propertyIdOrLiteralCached = propertyName => {
		let _ = propertyToIdOrLiteral.get(propertyName)
		if (_ === undefined) {
			_ = propertyNameOk(propertyName) ? Identifier(propertyName) : Literal(propertyName)
			propertyToIdOrLiteral.set(propertyName, _)
		}
		return _
	},

	member = (object, propertyName) =>
		memberExpression(object, propertyIdOrLiteralCached(propertyName)),

	toStatement = _ =>
		(_ instanceof Statement || _ instanceof Declaration) ? _ : ExpressionStatement(_),

	// TODO:ES6 arrow functions
	thunk = value =>
		functionExpressionThunk(BlockStatement([ ReturnStatement(value) ]), false)
