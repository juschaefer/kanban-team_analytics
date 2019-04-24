/**
 * @overview ccm component for kanban team analytics
 * @author Julian Schäfer <Julian.Schaefer@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version latest (0.0.0)
 * @changes
 */

(function () {

    let card_data = [];

    const component = {

        name: 'kanban_team_analytics',

        //ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

        config: {

            // user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", ["ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest"]],
            highchart: ["ccm.component", "https://ccmjs.github.io/akless-components/highchart/ccm.highchart.js"],

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
                    class: "container-fluid",
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
                                        /*{
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
                                        },*/
                                        /*{
                                            tag: "hr"
                                        },*/
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
                },
                row: {
                    class: "row",
                    inner: "%content%"
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

            // aggreated_team_data: {},
            // aggreated_board_data: {},

            //  "ignore": { "card": { "component": "https://ccmjs.github.io/akless-components/kanban_card/ccm.kanban_card.js", "config": {} } },
            // "onchange": function (event) {
            //     console.log(this.index, 'onchange', this.getValue(), event)
            // },
            //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]

        },

        Instance: function () {

            let $, data;
            const self = this;

            let team_data;
            let board_data;
            let card_data;

            this.ready = async () => {

                // set shortcut to help functions
                $ = self.ccm.helper;

                // listen to datastore changes => restart
                if ($.isObject(self.data) && $.isDatastore(self.data.store)) self.data.store.onchange = self.start;

                // logging of 'ready' event
                // self.logger && self.logger.log('ready', $.privatize(self, true));

            };

            this.start = async () => {

                // ================
                // = Get Raw-Data =
                // ================

                console.log("===== Get Raw-Data =====");

                const team_data = (await self.data.teams_store.get(self.data.key)).teams;
                console.log("team_data", team_data);

                const board_data = (await self.data.boards_store.get({ _id: { $regex: '^' + self.data.key + '*' }}));
                console.log("board_data", board_data);

                const card_data = await self.data.cards_store.get();
                console.log("card_data", card_data);

                const team_log_data = await self.data.team_log_store.get();
                console.log("team_log_data", team_log_data);

                // ====================
                // = Convert Raw-Data =
                // ====================
                console.log("===== Convert Data =====");

                team_data.forEach((team, index, team_data) => {

                    // console.log("team", team);

                    // console.log("team.members", team.members);
                    // console.log("team.members.length: ", team.members.length);
                    // if (team.members.length < 1) {
                    //     console.log("delete not empty team");
                    //     team_data.splice(index, 1);
                    //     return;
                    // }

                    // Convert Member-Data to array
                    // Add cards-attribute to member
                    let member_array = [];
                    Object.keys(team.members).forEach((member, index, members) => {
                        member_array.push({
                            name: member,
                            cards: card_data.filter((card, index) => {
                                return card.owner === member;
                            })
                        });
                    });

                    // Set team-name if not already set
                    if (!team.hasOwnProperty('name')) {
                        team['name'] = 'Team ' + (index + 1);
                    }

                    // Delet empty Teams
                    if (member_array.length < 1) {
                        team_data.splice(index,1);
                    } else {
                        team.members = member_array;
                    }
                });

                // Add Lane-Name if not exists
                board_data.forEach((board, index) => {
                    board.lanes.forEach((lane, index) => {
                        if (!lane.hasOwnProperty('name')) {
                            lane["name"] = "Lane " + (index+1);
                            lane["index"] = index;
                        }
                    });
                });

                // Add Lane Name to Each Card
                board_data.forEach(board => {
                    console.log("board.lanes", board.lanes);
                    board.lanes.forEach(lane => {
                        lane.cards.forEach((card, card_index) => {
                            let CARD = getCard(card[2].data.key);
                            CARD["lane"] = {
                                "name": lane.name,
                                "index": lane.index
                            };
                            lane.cards[card_index] = CARD;
                        });
                    });
                });

                // board_data.forEach((board, index) => {
                //     console.log("board", board.lanes);
                //
                //     board.lanes.forEach((lane, index) => {
                //         lane.cards.forEach((card, index) => {
                //             // console.log("card", card[2].data.key);
                //             // card = getCard(card[2].data.key);
                //             // getCard(card[2].data.key)["lane"] = lane;
                //         });
                //     });
                // });

                /*board_data.forEach((board, index) => {
                    // console.log("board", board);
                    board.lanes.forEach((lane, index_) => {
                        // console.log("lane", lane);

                        lane.cards.forEach((current, index__) => {
                            // console.log("raw card", card);
                            // console.log("resolved", );

                            // current[2] = getCard(current[2].data.key);
                        });

                    });
                });*/

                // ==================
                // = Aggregate Data =
                // ==================
                // Sets cards of team members
                // Add card_count attribute
                // add board lanes
                console.log("===== Aggregate Data =====");

                let aggregated_data = team_data;

                aggregated_data.forEach((team, index, team_data) => {
                    aggregated_data["team_count"] = team_data.length;

                    team_data.forEach((team, index) => {
                        const current = aggregated_data[index];
                        current["member_count"] = team.members.length;

                        let team_member = team.members.map(member => {
                            return member.name;
                        });

                        current["cards"] = card_data.filter(card => {
                            return team_member.indexOf(card.owner) >= 0;
                        });

                        current["card_count"] = current["cards"].length;

                        let board = getBoard(team.key);
                        if (board !== null) {
                            current["lanes"] = board.lanes;
                        }

                    });

                    // Add Lane for Team if not exists
                    if (!team.hasOwnProperty('lanes')) {
                        aggregated_data[index]["lanes"] = [];
                    }

                });

                console.log("aggregated_data", aggregated_data);

                // =================
                // = Set Structure =
                // =================
                console.log("===== Set Structure =====");

                let teams_html = [];

                team_data.forEach((team, index, team_data) => {
                    let team_ = self.html.team;
                    let members_ = "";

                    // console.log("team", team);

                    // Exclude empty teams
                    // if (team.members.length > 0) {

                        team.members.forEach((member, index, team) => {
                            members_ += "<li>" + member.name + "</li>";
                        });

                        teams_html.push($.html(team_, {
                            team_name: team.name,
                            team_member: members_

                        }));
                    // }
                });

                $.setContent(self.element, $.html(self.html.main, {
                    // anzahl_teams: _anzahl_teams(team_data),
                    // anzahl_team_mitglieder: _anzahl_team_mitglieder(team_data),
                    // mitglieder_pro_team: _mitglieder_pro_team(team_data),
                    // min: _min(team_data),
                    // max: _max(team_data),
                    // team_member: _team_member(team_data),
                    // sum_cards: _sum_cards(board_data),
                    teams: teams_html
                }));

                const main = self.element.querySelector('#main');

                let team_chooser = [];
                team_data.forEach((current, index, team) => {
                    team_chooser.push({
                        tag: "option",
                        value: index,
                        inner: current.name
                    });
                });

                async function changeTeam(index) {
                    const card_area = self.element.querySelector('#teams_student_area');
                    const chart_area = self.element.querySelector('#uebersicht_karten');

                    // Clear Area
                    card_area.innerHTML = "";
                    chart_area.innerHTML = "";

                    let html_team_crads = card_area.appendChild($.html(self.html.row, {content: ""}));

                    // const sum_cards_team = team_data[index].team_members.reduce((result, member) => {
                    //     return result + users[member].cards.length;
                    // }, 0);

                    // console.log("team_data["+index+"]", team_data[index]);

                    // const sum_cards_team = card_data.reduce((card, current, index, return_) => {
                    /*const sum_cards_team = card_data.reduce((accumulator, currentValue, currentIndex, array) => {

                        for (let index_ = 0; index_ < team_data.length; index_++) {
                            let team = team_data[index_];

                            // if (team.members.indexOf(currentValue.owner)) {
                            //     console.log("accumulator", accumulator);
                            //     return ++accumulator;
                            // }
                        }

                        // team_data.forEach((team, index, team_data) => {
                        //     console.log("card", card);
                        //     if (team.members.indexOf(card.owner)) {
                        //         return ++return_;
                        //     }
                        // });

                    }, 0);

                    // console.log("sum_cards_team", sum_cards_team);*/

                    aggregated_data[index].members.forEach(member => {

                        html_team_crads.appendChild($.html(self.html.card, {
                            card_header: member.name,
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
                                                    inner: member.cards.length
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
                                                    inner: aggregated_data[index].card_count > 0 ? round(((member.cards.length / aggregated_data[index].card_count)*100), 0 )+ "%" : "0%",
                                                }
                                            ]
                                        }
                                    ]
                                }]

                        }));
                    });

                    /**
                     * Bar-Chart cards-count each lane and user
                     * Creates a Bar-Chart with lanes and card-counts each lane per team member
                     */
                    let SERIES_DATA = [];

                    console.log("aggregated_data[index]", aggregated_data[index]);
                    aggregated_data[index].lanes.forEach(lane => {

                        let card_count = [];
                        aggregated_data[index].members.forEach( member => {
                            card_count.push(lane.cards.filter(card => card.owner === member.name).length);
                        });

                        SERIES_DATA.push({
                            "name": lane.name,
                            "data": card_count
                        });

                    });

                    console.log("SERIES_DATA", SERIES_DATA);

                    const board_card_chart = await self.highchart.start({
                        "settings": {
                            "chart": {
                                "type": "column"
                            },
                            "title": {
                                "text": "Übersicht Kartenverteilung"
                            },
                            "xAxis": {
                                "categories": aggregated_data[index].members.map(member => {
                                    return member.name
                                }),
                                "crosshair": true
                            },
                            "yAxis": {
                                "min": 0,
                                "title": {
                                    "text": "Anzahl Karten"
                                }
                            },
                            "tooltip": {
                                "headerFormat": "<span style='font-size:1.1em'>{point.key}</span><table>",
                                "pointFormat": "<tr><td style='color:{series.color};padding:0'>{series.name}: </td><td style='padding:0'><b>{point.y}</b></td></tr>",
                                "footerFormat": "</table>",
                                "shared": true,
                                "useHTML": true
                            },
                            "plotOptions": {
                                "column": {
                                    "pointPadding": 0.2,
                                    "borderWidth": 0
                                }
                            },
                            "series": SERIES_DATA
                        }
                    });

                    chart_area.appendChild($.html(board_card_chart.root));


                    /**
                     * Login-Count
                     * Erstellt eine Karte mit einem Pie-Chart welches die Anzahl an Anmeldungen am System pro User anzeigt.
                     */
                    // Get Login Data filtered by event and team
                    let login = _getLogEventData("start", team_log_data.filter((data) => {
                        let in_team = false;

                        aggregated_data[index].members.forEach(member => {
                            if (member.name === data.data.user) {
                                in_team = true;
                            }
                        });

                        return in_team;
                    }));

                    let user_group = {};
                    for (let key in login) {
                        let date = login[key].data.user;
                        if (!user_group[date]) {
                            user_group[date] = [];
                        }
                        user_group[date].push(login[key]);
                    }

                    let login_count = [];
                    for (let key in user_group) {
                        login_count.push({
                            "name": key,
                            "y": user_group[key].reduce((result, entry, index) => {
                                return ++result;
                            }, 0)
                        });
                    }

                    const login_chart = await self.highchart.start({
                        "settings": {
                            "chart": {
                                "plotBackgroundColor": null,
                                "plotBorderWidth": null,
                                "plotShadow": false,
                                "type": "pie"
                            },
                            "title": {
                                "text": "Benutzung der Anwendung (Starts)"
                            },
                            "tooltip": {
                                "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
                            },
                            "plotOptions": {
                                "pie": {
                                    "allowPointSelect": true,
                                    "cursor": "pointer",
                                    "dataLabels": {
                                        "enabled": true,
                                        "format": "<b>{point.name}</b>: {point.percentage:.1f} %",
                                        "style": {
                                            "color": "black"
                                        }
                                    }
                                }
                            },
                            "series": [
                                {
                                    "name": "User",
                                    "colorByPoint": true,
                                    "data": login_count,
                                }
                            ]
                        }

                    });

                    chart_area.appendChild($.html(login_chart.root))

                }

                main.appendChild($.html(self.html.card, {
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
                            },
                            {
                                id: "uebersicht_karten",
                                class: "row-fluid"
                            }
                        ]
                    }
                }));


                /*const logins = $.html(self.html.card, {
                    card_header: "Anmeldungen",
                    card_body: {
                        inner: [
                            login_chart.root
                        ]
                    }
                });*/

                // main.appendChild(logins);

                changeTeam(2);

                /**
                 *
                 * @param key
                 * @returns {*}
                 */
                function getBoard(key) {
                    console.log("===== getBoard(" + key + ") =====");

                    let board = null;

                    board_data.forEach((current, index, board_data) => {

                        if (current.key === (self.data.key + "_" +  key)) {
                            board = current;
                        }
                    });

                    return board;
                }

                /**
                 * Returns a Card for given key
                 * @param key
                 * @returns {*}
                 */
                function getCard(key) {
                    console.log("===== getCard(" + key + ") =====");

                    let card = null;

                    card_data.forEach((current, index, card_data) => {
                        if (current.key === key) {
                            card = current;
                        }
                    });

                    return card;
                }

            };

            function _getLogEventData(event, data) {
                return data.filter(datum => {
                    return datum.event === event;
                });
            }

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

    function getTeam(team_data) {
        console.log("===== getTeam(" + team_data + ") =====");

        if (team_data != null || typeof team_data != 'undefined') {
            return null;
        }



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
            let max = dataArray[0];
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