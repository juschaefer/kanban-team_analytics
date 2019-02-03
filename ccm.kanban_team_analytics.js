/**
 * @overview ccm component for kanban team analytics
 * @author Julian Schäfer <Julian.Schaefer@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (0.0.0)
 * @changes
 */

(function () {

    const component = {

        name: 'kanban_team_analytics',

        //ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

        config: {

            // user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", ["ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest"]],

            html: {},

            // bootstrap: [
            //     "ccm.load", {
            //         "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
            //         "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
            //         "crossorigin": "anonymous"
            //     }
            // ],

            css: ["ccm.load", "https://ccmjs.github.io/akless-components/kanban_board/resources/default.css"],
            data: {},

            //  "ignore": { "card": { "component": "https://ccmjs.github.io/akless-components/kanban_card/ccm.kanban_card.js", "config": {} } },
            // "onchange": function (event) {
            //     console.log(this.index, 'onchange', this.getValue(), event)
            // },
            //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

        },

        Instance: function () {

            let $, data;
            const self = this;

            this.ready = async () => {

                // set shortcut to help functions
                $ = self.ccm.helper;

                // listen to datastore changes => restart
                if ($.isObject(self.data) && $.isDatastore(self.data.store)) self.data.store.onchange = self.start;

                // logging of 'ready' event
                // self.logger && self.logger.log('ready', $.privatize(self, true));

            };

            this.start = async () => {

                let team_data = (await self.data.teams_store.get(self.data.key)).teams;
                console.log("team_data", team_data);

                let board_data = (await self.data.boards_store.get(self.data.key)).lanes;
                console.log("board_data", board_data);

                let card_data = await self.data.cards_store.get();
                console.log("card_data", card_data);


                // TEAMS
                const anzahl_teams = team_data.length;
                console.log("Anzahl Teams", anzahl_teams);

                const anzahl_nicht_leer_teams = team_data.reduce((result, team, index, team_data) => {
                    return result += Object.keys(team.members).length > 0 ? 1 : 0;
                }, 0);
                console.log("Anzahl nicht leerer Teams", anzahl_nicht_leer_teams);

                const anzahl_teilnehmer = team_data.reduce((result, team, index, team_data) => {
                    return result + Object.keys(team.members).length;
                }, 0);
                console.log("Anzahl Teilnehmer", anzahl_teilnehmer);

                const durchschnitt_members_team = round(anzahl_teilnehmer / anzahl_teams);
                console.log("Durchschnittliche Anzahl Teilnhemer pro Team", durchschnitt_members_team);

                const durchschnitt_members_nicht_leerer_team = round(anzahl_teilnehmer / anzahl_nicht_leer_teams);
                console.log("Durchschnittliche Anzahl Teilnhemer pro (nicht leerem) Team", durchschnitt_members_nicht_leerer_team);

                // BOARD


            };

            /**
             * returns current result data
             * @returns {Object} current kanban board data
             */
            self.getValue = () => data;

        }

    };

    function round(number, precision) {
    // function round(number) {

        // When not a number oder an interger is given
        // if (!number.isNumber || number.isInteger) {
        //     console.log("RETURN");
        //     return number;
        // }

        // Default Value if precision is not set
        if (precision == null || typeof precision == 'undefined') {
            precision = 1;
        }

        let factor = 1;
        for (let count = 0; count < precision; count++) {
            factor *= 10;
        }

        return (Math.round(number * factor) / factor);
        // return Math.round(number);
    };

    let b = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[b]) return window.ccm.files[b] = component;
    (b = window.ccm && window.ccm.components[component.name]) && b.ccm && (component.ccm = b.ccm);
    "string" === typeof component.ccm && (component.ccm = {url: component.ccm});
    let c = (component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/) || ["latest"])[0];
    if (window.ccm && window.ccm[c]) window.ccm[c].component(component); else {
        var a = document.createElement("script");
        document.head.appendChild(a);
        component.ccm.integrity && a.setAttribute("integrity", component.ccm.integrity);
        component.ccm.crossorigin && a.setAttribute("crossorigin", component.ccm.crossorigin);
        a.onload = function () {
            window.ccm[c].component(component);
            document.head.removeChild(a)
        };
        a.src = component.ccm.url
    }
})();