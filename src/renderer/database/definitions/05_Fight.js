import Sequelize from 'sequelize'
import timestamp_definition from './timestamp'
import { FIGHT_FIGHTER_NUMBER_LIST, ENTRIABLE_MODEL_NAME_LIST } from '@root/constant'

export default {
    name: "Fight",
    getDefinition: is_migration => {
        const add_virtual_field = is_migration === true ? undefined : true

        return {
            id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            fightable_id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false
            },
            fightable: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            entriable1_id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false
            },
            entriable2_id: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false
            },
            entriable: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            sudden_death: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            added_manually: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0
            },
            ...add_virtual_field && {
                entry1: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        if (!!this.team1) return this.team1.get({ plain: true })
                        if (!!this.fighter1) return this.fighter1.get({ plain: true })
                        return null
                    }
                },
                entry2: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        if (!!this.team2) return this.team2.get({ plain: true })
                        if (!!this.fighter2) return this.fighter2.get({ plain: true })
                        return null
                    }
                }
            },
            ...is_migration && timestamp_definition
        }
    },
    getAssociation: Model => model_list => {
        FIGHT_FIGHTER_NUMBER_LIST.forEach(number => {
            // TODO : Trouver un moyen de filtrer sur Entriable ... car sinon on a un fighter / team qui sort pour un ID en confusion...
            // Les hooks ne fonctionne pas. Ne peut pas implémenter le hookAfterFind d'un belongsTo polymorphique : https://sequelize.org/master/manual/polymorphic-associations.html
            ENTRIABLE_MODEL_NAME_LIST.forEach(entriable => // TODO Il faudrait pouvoir définir qu'une seule association `as: 'entry'` et qui va chercher dynamiquement soit sur Fighter, soit sur Team...
                Model.belongsTo(model_list[entriable], {
                    foreignKey: `entriable${number}_id`,
                    constraints: false, // for polymorphic relationship
                    as: `${entriable.toLowerCase()}${number}`
                })
            )

            Model.hasMany(model_list.FightFighterOrder, { as: `fight_fighter_order_list${number}`, foreignKey: 'fight_id' }) // Only used for creation, because fighters already exists
        })

        Model.belongsTo(model_list.Pool, { foreignKey: "fightable_id", as: "pool" })
        Model.hasMany(model_list.FighterFightMeta, { as: 'fighter_fight_meta_list', foreignKey: 'fight_id' })
    }
}