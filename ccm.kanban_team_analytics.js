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

            html: {
                // "main": ["ccm.load", 'resources/tpl.analytics.html'],
                // "team": ["ccm.load", 'resources/tpl.team.html'],
                // main: {
                //     class: "container",
                //     inner: [
                //
                //     ]
                // }

                main: {
                    id: "main",
                    class: "container",
                    inner: [
                        {
                            class: "card",
                            inner: [
                                {
                                    tag: "h5",
                                    class: "card-header",
                                    inner: "Überlick"
                                }, {
                                    class: "card-body",
                                    // inner: "%teams%"
                                    inner: [
                                        {
                                            inner: [
                                                {
                                                    class: "container-fluid",
                                                    inner: [
                                                        {
                                                            class: "row",
                                                            inner: [
                                                                {
                                                                    class: "col-sm-4",
                                                                    inner: "Anzahl Teams"
                                                                },
                                                                {
                                                                    class: "col-sm-8",
                                                                    inner: "%anzahl_teams%"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            class: "row",
                                                            inner: [
                                                                {
                                                                    class: "col-sm-4",
                                                                    inner: "Anzahl Teammitglieder"
                                                                },
                                                                {
                                                                    class: "col-sm-8",
                                                                    inner: "%anzahl_team_mitglieder%"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            class: "row",
                                                            inner: [
                                                                {
                                                                    class: "col-sm-4",
                                                                    inner: " &Oslash;  Mitglieder pro Team"
                                                                },
                                                                {
                                                                    class: "col-sm-8",
                                                                    inner: "%mitglieder_pro_team%"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            class: "row",
                                                            inner: [
                                                                {
                                                                    class: "col-sm-4",
                                                                    inner: "Min (> 0)"
                                                                },
                                                                {
                                                                    class: "col-sm-8",
                                                                    inner: "%min%"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            class: "row",
                                                            inner: [
                                                                {
                                                                    class: "col-sm-4",
                                                                    inner: "Max"
                                                                },
                                                                {
                                                                    class: "col-sm-8",
                                                                    inner: "%max%"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            class: "row",
                                                            inner: [
                                                                {
                                                                    class: "col-sm-4",
                                                                    inner: "Gesamtzahl Karten"
                                                                },
                                                                {
                                                                    class: "col-sm-8",
                                                                    inner: "%sum_cards%"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            tag: "hr"
                                        },
                                        {
                                            class: "d-flex flex-row justify-content-around",
                                            inner: "%teams%"
                                        }
                                    ]

                                }
                            ]
                        }
                    ]

                },
                team: {
                    class: "card",
                    inner: [
                        {

                            tag: "h5",
                            class: "card-header",
                            inner: "%team_name%"
                        },
                        {

                            class: "card-body",
                            inner: {

                                tag: "ul",
                                // style: "list-style-type: none;",
                                // inner: "%team_member%"
                                inner: [
                                    {
                                        inner: "%team_member%"
                                    }
                                ]
                            }
                        }
                    ]
                },
                card: {
                    class: "card",
                    style: "margin-bottom: 1.5rem; margin-top: 1.5em;",
                    inner: [
                        {
                            tag: "h5",
                            class: "card-header",
                            inner: "%card_header%"
                        },
                        {
                            class: "card-body",
                            inner: "%card_body%"
                        }
                    ]
                },
                team_chooser: {
                    tag: "select",
                    id: "team_chooser",
                    class: "custom-select",
                    inner: "%teams%",
                    onchange: "%onchange%"
                }
                // boards: {
                //     inner: "%board_data%"
                // }

            },

            bootstrap: [
                "ccm.load", {
                    "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                    "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
                    "crossorigin": "anonymous"
                }
            ],

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

                const testvalues = [
                    10.45,
                    10.26,
                    10.49,
                    10.36,
                    10.53,
                    10.77,
                    10.4,
                    10.4,
                    10.56,
                    10.88,
                    10.47,
                    10.49,
                    10.46,
                    10.38,
                    10.47,
                    10.39,
                    10.51,
                    10.49,
                    10.54,
                    10.46,
                    10.45,
                    10.49,
                    10.46,
                    10.46,
                    10.51,
                    10.47,
                    10.54,
                    10.52,
                    10.47,
                    10.44,
                    11.62,
                    11.6,
                    10.42,
                    10.42,
                    10.39,
                    10.22,
                    10.47,
                    10.42,
                    10.52,
                    10.57,
                    10.49,
                    10.49,
                    10.51,
                    10.47,
                    10.51,
                    10.48,
                    10.4,
                    10.3,
                    10.47,
                    10.45
                ];

                let team_data = (await self.data.teams_store.get(self.data.key)).teams;
                console.log("team_data", team_data);

                let board_data = (await self.data.boards_store.get(self.data.key)).lanes;
                console.log("board_data", board_data);

                let card_data = await self.data.cards_store.get();
                console.log("card_data", card_data);


                // TEAMS

                const anzahl_nicht_leer_teams = team_data.reduce((result, team, index, team_data) => {
                    return result += Object.keys(team.members).length > 0 ? 1 : 0;
                }, 0);
                // console.log("Anzahl nicht leerer Teams", anzahl_nicht_leer_teams);

                const durchschnitt_members_nicht_leerer_team = round(_anzahl_team_mitglieder(team_data) / anzahl_nicht_leer_teams);
                // console.log("Durchschnittliche Anzahl Teilnhemer pro (nicht leerem) Team", durchschnitt_members_nicht_leerer_team);

                // console.log("count", count);

                // console.log("max_team (alternate)", max(count));

                // console.log(testvalues.length);
                // const team_spikes = filterOutliers(count);
                // console.log("spikes", team_spikes);

                // BOARD


                // TEAM

                // Karten pro team und user
                // [{
                //     user: ,
                //     lane: ,
                //     card: {},
                // }]
                // const user = [];

                // let users = team_data.map( (user, index, team_data) => {
                //     if (Object.keys(user.members).length > 0) {
                //         // console.log("user.members", user.members);
                //
                //         Object.keys(user.members).forEach((member, index, user) => {
                //                 // console.log("member", member)
                //             return member;
                //         });
                //
                //         // user.members.forEach( (member, index, user) => {
                //         //     console.log("member", member);
                //         // });
                //     }
                // });

                // Erstelle User-Data
                const users = [];
                const teams = [];

                team_data.forEach((team, team_index, team_data) => {
                    if (Object.keys(team.members).length > 0) {

                        let team_ = [];

                        Object.keys(team.members).forEach((member, index, user) => {
                            // console.log("member", member)

                            team_.push(member);

                            users[member] = {
                                "username": member,
                                "index": team_index,
                                "team": team,
                                "cards": card_data.filter((card, index, cards) => {
                                    if (card.owner === member) {
                                        return card;
                                    }
                                })
                            };
                        });

                        teams.push({
                            "team_index": team_index,
                            "team_name": "Team " + (team_index + 1),
                            "team_members": Object.keys(team.members),
                            "team_data": team
                        });

                    }
                });
                console.log("users", users);
                console.log("team", teams);

                // console.log("team", team_data);
                // [{
                //     "members": {
                //         "jschae2",
                //         "klaus2s"
                //     },
                //     "team": team
                // }]
                //
                // user
                // [{
                //     "jscahe2s": {},
                //
                // }]

                // Je Karte!
                const lane_card = [];

                for (let lane_index = 0; lane_index < board_data.length; lane_index++) {
                    const lane = board_data[lane_index];

                    if (Object.keys(lane.cards).length > 0) {
                        for (let card_index = 0; card_index < lane.cards.length; card_index++) {

                            let card = lane.cards[card_index];

                            const card_store = await ccm.store(card[2].data.store[1]);
                            const card_data = await card_store.get(card[2].data.key);

                            console.log("lane_team", card_data.owner);

                            lane_card.push({
                                "lane": {
                                    "index": lane_index,
                                    "data": lane
                                },
                                "card": card_data,
                                "team": users[card_data.owner],
                                "user": card_data.owner
                            });
                        }
                    } else {
                        lane_card.push({
                            "lane": {
                                "index": lane_index,
                                "data": lane
                            },
                            "card": null
                        });
                    }
                }
                console.log("user_lane_card", lane_card);

                // Karten pro Team

                teams.forEach((team, index, teams) => {

                    let count = lane_card.filter((card, index, lane_card) => {
                        if (team.team_members.indexOf(card.user) > 0) {
                            return card;
                        }
                    });
                    // console.log(team.team_name, count);
                });

                // Karte pro User

                let teams_html = [];

                teams.forEach((team, index, teams) => {
                    let team_ = self.html.team;
                    let members_ = "";

                    team.team_members.forEach((member, index, team) => {
                        members_ += "<li>" + member + "</li>";
                    });

                    teams_html.push($.html(team_, {
                        team_name: team.team_name,
                        team_member: members_
                    }));
                });


                // adds main html structure
                $.setContent(self.element, $.html(self.html.main, {
                    anzahl_teams: _anzahl_teams(team_data),
                    anzahl_team_mitglieder: _anzahl_team_mitglieder(team_data),
                    mitglieder_pro_team: _mitglieder_pro_team(team_data),
                    min: _min(team_data),
                    max: _max(team_data),
                    team_member: _team_member(team_data),
                    sum_cards: _sum_cards(board_data),
                    teams: teams_html
                }));

                const main = self.element.querySelector('#main');

                const boards = [];


                board_data.forEach((lane, index, board_data) => {
                    // Lane ohne Karten
                    let lane_count = lane.cards.length;
                    // if (Object.keys(lane.cards).length > 0) {
                    //     lane_count = 0;
                    // }

                    // Object.assign(card, self.html.card)

                    boards.push($.html(self.html.card, {
                        card_header: "Team " + (index + 1),
                        card_body: "Karten: " + lane_count
                    }));

                    console.log("Lane " + index, lane_count);
                    // } else {
                    //     console.log("Lane " + index, 0);
                    // }
                });

                let test = $.html(self.html.card, {
                    card_header: "Boards",
                    card_body: {
                        class: "d-flex flex-row justify-content-around",
                        inner: boards
                    }
                });

                main.appendChild(test);


                function count_cards(data, user) {
                    return data.reduce((result, card, index, data) => {
                        if (card.owner === user) {
                            return ++result;
                        }

                        return result;
                    }, 0);
                }

                // console.log("cards for jschae2s", count_cards(card_data, 'jschae2s'));

                let team_chooser = [];
                teams.forEach((current, index, team) => {
                    team_chooser.push({
                        tag: "option",
                        value: index,
                        inner: current.team_name
                    });
                });

                console.log("team_choose", team_chooser);

                // Auswertung Studierende: Wer hat wiviel Karten? Wieviel Karten sind in welcher Line (%?)?

                function changeTeam(index) {
                    const area = self.element.querySelector('#teams_student_area');

                    // Clear Area
                    area.innerHTML = "";

                    console.log(teams[index]);

                    // area.appendChild($.html("<h3>" + index + "</h3>"));

                    const sum_cards_team = teams[index].team_members.reduce( (result, member) => {
                        return result + users[member].cards.length;
                    }, 0);

                    teams[index].team_members.forEach( (member) => {

                        const user = users[member];

                        area.appendChild( $.html(self.html.card, {
                            card_header: member,
                            card_body: [
                                {
                                    class: "container-fluid",
                                    inner: [
                                        {
                                            class: "row",
                                            inner: [
                                                {
                                                    class: "col-sm-6",
                                                    inner: "Anzahl Karten"
                                                },
                                                {
                                                    class: "col-sm-6",
                                                    inner: user.cards.length
                                                }
                                            ]
                                        },
                                        {
                                            class: "row",
                                            inner: [
                                                {
                                                    class: "col-sm-6",
                                                    inner: "Relativ zum Team"
                                                },
                                                {
                                                    class: "col-sm-6",
                                                    inner: (sum_cards_team > 0 ? round(user.cards.length / sum_cards_team, 2) : 0) + "%"
                                                }
                                            ]
                                        }
                                    ]
                                }]

                        }));
                    });

                }

                let blub = $.html(self.html.card, {
                    card_header: "Studierende",
                    card_body: {
                        // class: "d-flex flex-row justify-content-around",
                        inner: [
                            $.html(self.html.team_chooser, {
                                teams: team_chooser,
                                onchange: function (event) {
                                        changeTeam(this.value);
                                }
                            }),
                            {
                                id: "teams_student_area",
                                class: "d-flex flex-row justify-content-around"
                            }
                        ]
                    }
                });

                main.appendChild(blub);

                // Default Team
                changeTeam(0);
            };

            /**
             * returns current result data
             * @returns {Object} current kanban board data
             */
            self.getValue = () => data;

        }


    };

    /**
     * ANALYTICS FUNCTION
     */

    function _anzahl_teams(data) {
        // const anzahl_teams = team_data.length;
        // console.log("Anzahl Teams", anzahl_teams);
        return data.length;
    }

    function _anzahl_team_mitglieder(data) {
        return data.reduce((result, team, index, team_data) => {
            return result + Object.keys(team.members).length;
        }, 0);
        // console.log("Anzahl Teilnehmer", anzahl_teilnehmer);
        // return 0;
    }

    function _mitglieder_pro_team(data) {
        return round(_anzahl_team_mitglieder(data) / _anzahl_teams(data));
    }

    function _min(data) {
        return data.reduce((min, team, index, team_data) => {

            if (min == null) {
                return Object.keys(team.members).length
            }

            let count_members = Object.keys(team.members).length;

            return count_members > 0 && count_members < min ? count_members : min;

        }, null);
    }

    function _max(data) {
        return data.reduce((max, team, index, team_data) => {

            if (max == null) {
                return Object.keys(team.members).length
            }

            let count_members = Object.keys(team.members).length;

            return count_members > max ? count_members : max;

        }, null);
    }

    function _team_member(data) {
        return data.map((team, index, team_data) => {
            return Object.keys(team.members).length;
        });
    }

    function _sum_cards(data) {
        return data.reduce((result, lane, index, board_data) => {
            // Object ohne Karten
            if (Object.keys(lane.cards).length == 0) {
                return result;
            }

            return result + lane.cards.length;
        }, 0);
    }

    /**
     * MATHEMATICAL FUNCTIONS
     */

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
    }

    function array_max(dataArray) {
        if (dataArray.length > 0) {
            let max = dataArray[0]
            dataArray.forEach((datum, index, dataArray) => {
                if (datum > max) {
                    max = datum;
                }
            });
            return max
        } else {
            return 0;
        }
    }

    // https://stackoverflow.com/questions/20811131/javascript-remove-outlier-from-an-array#20811670
    // https://gist.github.com/rmeissn/f5b42fb3e1386a46f60304a57b6d215a
    function filterOutliers(someArray) {

        if (someArray.length < 4)
            return someArray;

        let values, q1, q3, iqr, maxValue, minValue;

        values = someArray.slice().sort((a, b) => a - b);//copy array fast and sort

        if ((values.length / 4) % 1 === 0) {//find quartiles
            q1 = 1 / 2 * (values[(values.length / 4)] + values[(values.length / 4) + 1]);
            q3 = 1 / 2 * (values[(values.length * (3 / 4))] + values[(values.length * (3 / 4)) + 1]);
        } else {
            q1 = values[Math.floor(values.length / 4 + 1)];
            q3 = values[Math.ceil(values.length * (3 / 4) + 1)];
        }

        iqr = q3 - q1;
        maxValue = q3 + iqr * 1.5;
        minValue = q1 - iqr * 1.5;

        const cleaned = [];
        const outliers = [];

        values.forEach((datum, index, values) => {
            if ((datum >= minValue) && (datum <= maxValue)) {
                cleaned.push(datum);
            } else {
                outliers.push(datum);
            }
        });

        return {"cleaned": cleaned, "outliers": outliers};
    }

    function grubb(dataArray) {
        // const value = spikes(dataArray);
        let data = [];

        let cleaned = clean_spikes(dataArray, spikes(dataArray));

        if (cleaned.length > 0) {
            // Mit bereinigtem Array weiter machen
        }

        return data.concat(cleaned);

    }

    // function clean_spikes(dataArray, spikes) {
    //
    //     let spikes_items = [];
    //     let data_items = [];
    //
    //     dataArray.forEach( (datum, index, dataArray) => {
    //         if ( datum  ) {
    //
    //         } else {
    //
    //         }
    //     });
    //
    //     return
    //
    // }

    // Grubb algorithm
    function spikes(dataArray) {
        const x_ = mittelwert(dataArray);
        console.log("x_", x_);
        // const max = dataArray.reduce( (result, datum, index, dataArray) => {
        //     let value = datum - x_;
        //
        //     if (result == null) {
        //         return value;
        //         }
        //
        //     return value > result ? value : result;
        // }, null);

        const max = array_max(dataArray.map((datum, index, dataArray) => {
            return (datum - x_);
        }));
        console.log("max", max);
        console.log("stdev", Math.sqrt(korrigierte_stichprobenvarianz(dataArray)));
        return (max / Math.sqrt(korrigierte_stichprobenvarianz(dataArray)));
    }

    function korrigierte_stichprobenvarianz(dataArray) {
        const n = dataArray.length;
        const x_ = mittelwert(dataArray);

        const sum = dataArray.reduce((result, datum, index, dataArray) => {
            return result + Math.pow((datum - x_), 2);
        }, 0);

        return sum / (n - 1);
    }

    function mittelwert(dataArray) {
        let sum = dataArray.reduce((result, datum, index, dataArray) => {
            return result + datum;
        });

        return sum / dataArray.length;
    }

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