/**
 * @overview configurations of ccm component for kanban team analytics
 * @author Julian Schäfer <Julian.Schaefer@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

const LOCAL_DATA_SERVER = "http://192.168.99.101:8080";
const HBRS_CCM2_DATA_SERVER = "https://ccm2.inf.h-brs.de";

ccm.files['configs.js'] = {

    "local": {
        "key": "local",

        "data": {
            "teams_store": ["ccm.store", {"name": "jschae2s_teambuild", "url": LOCAL_DATA_SERVER}],
            "boards_store": ["ccm.store", {"name": "jschae2s_kanban_team_borad", "url": LOCAL_DATA_SERVER}],
            "cards_store": ["ccm.store", {"name": "jschae2s_kanban_team_cards", "url": LOCAL_DATA_SERVER}],
            "team_log_store": ["ccm.store", {"name": "jschae2s_sose_19_prototyp_log", "url": LOCAL_DATA_SERVER}],
            "key": "jschae2s_sose_19_prototyp"
        }
    },

    "jschae2s_demo": {
        "key": "jschae2s_demo",

        "data": {
            "teams_store": ["ccm.store", {"name": "jschae2s_teambuild", "url": HBRS_CCM2_DATA_SERVER}],
            "boards_store": ["ccm.store", {"name": "jschae2s_kanban_team_borad", "url": HBRS_CCM2_DATA_SERVER}],
            "cards_store": ["ccm.store", {"name": "jschae2s_kanban_team_cards", "url": HBRS_CCM2_DATA_SERVER}],
            "team_log_store": ["ccm.store", {"name": "jschae2s_demo_log", "url": HBRS_CCM2_DATA_SERVER}],
            "key": "jschae2s_demo"
        }
    }

};