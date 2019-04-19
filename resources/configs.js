/**
 * @overview configurations of ccm component for kanban team analytics
 * @author Julian Schäfer <Julian.Schaefer@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files['configs.js'] = {

    "vm": {
        "key": "vm",

        "data": {
            "teams_store": ["ccm.store", {"name": "jschae2s_teambuild", "url": "http://192.168.99.101:8080"}],
            "boards_store": ["ccm.store", {"name": "jschae2s_kanban_team_borad", "url": "http://192.168.99.101:8080"}],
            "cards_store": ["ccm.store", {"name": "jschae2s_kanban_team_cards", "url": "http://192.168.99.101:8080"}],
            "team_log_store": ["ccm.store", {"name": "jschae2s_kanban_team_log", "url": "http://192.168.99.101:8080"}],
            "key": "jschae2s_sose_19"
        },
    }

};