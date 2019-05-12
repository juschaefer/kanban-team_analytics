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

            user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", ["ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "hbrsinfkaul"]],
            highchart: ["ccm.component", "https://ccmjs.github.io/akless-components/highchart/ccm.highchart.js"],

            html: {
                main: {
                    id: "main",
                    class: "container-fluid",
                    inner: [
                        {
                            id: "user"
                        },
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
                                            class: "row",
                                            inner: [
                                                {
                                                    class: "col-sm-6",
                                                    inner: "Teilnehmer: %sum_user%<br><br>Teams: %sum_teams%<br>&Oslash;  Mitglieder pro Team: %average_user_team%<br><br>Karten: %sum_cards%<br>&Oslash;  Karten pro Team: %average_card_team%"
                                                }, {
                                                    class: "col-sm-6",
                                                    id: "platform_chart"
                                                }
                                            ]
                                        }, {
                                            inner: {
                                                tag: "hr"
                                            }
                                        }, {
                                            inner: {
                                                class: "d-flex justify-content-around",
                                                inner: "%teams%"
                                            }
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
                            inner: [{
                                inner: "Karten: %sum_team_cards%"
                            }, {
                                inner: "Teilnehmer: %sum_team_user%"
                            }, {
                                tag: "br"
                            }, {
                                tag: "h6",
                                inner: "Mitglieder"
                            }, {
                                tag: "ul",
                                inner: [
                                    {
                                        inner: "%team_member%"
                                    }
                                ]
                            }]
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

            },

            bootstrap: [
                "ccm.load", {
                    "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                    "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
                    "crossorigin": "anonymous"
                }
            ],

            css: ["ccm.load", "../kanban_team_analytics/resources/default.css"],
            data: {},

        },

        Instance: function () {

            let $, data;
            const self = this;

            this.ready = async () => {

                // set shortcut to help functions
                $ = self.ccm.helper;

                // login user, if not logged in
                self.user && await self.user.login();

            };

            this.start = async () => {

                // ================
                // = Get Raw-Data =
                // ================

                const team_data = (await self.data.teams_store.get(self.data.key)).teams;

                const board_data = (await self.data.boards_store.get({ _id: { $regex: '^' + self.data.key + '*' }}));

                const card_data = await self.data.cards_store.get();

                const team_log_data = await self.data.team_log_store.get();

                // ====================
                // = Convert Raw-Data =
                // ====================

                team_data.forEach((team, index, team_data) => {

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

                // ==================
                // = Aggregate Data =
                // ==================
                // Sets cards of team members
                // Add card_count attribute
                // add board lanes

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

                // =================
                // = Set Structure =
                // =================

                let teams_html = [];

                team_data.forEach((team, index, team_data) => {
                    let team_ = self.html.team;
                    let members_ = "";

                    team.members.forEach((member, index, team) => {
                        members_ += "<li>" + member.name + "</li>";
                    });

                    teams_html.push($.html(team_, {
                        team_name: team.name,
                        sum_team_cards: team.card_count,
                        sum_team_user: team.member_count,
                        team_member: members_
                    }));
                });

                const SUM_TEAMS = aggregated_data.length;

                const SUM_USER = aggregated_data.reduce((result, current) => {
                    return result + current.member_count;
                }, 0);

                const AVERAGE_USER_TEAM = round(SUM_USER / SUM_TEAMS, 1);

                const SUM_CARDS = aggregated_data.reduce((result, current) => {
                    return result + current.card_count;
                }, 0);

                const AVERAGE_CARD_TEAM = round(SUM_CARDS / SUM_TEAMS, 1);

                await $.setContent(self.element, $.html(self.html.main, {
                    sum_teams: SUM_TEAMS,

                    sum_user: SUM_USER,
                    average_user_team: AVERAGE_USER_TEAM,

                    sum_cards: SUM_CARDS,
                    average_card_team: AVERAGE_CARD_TEAM,

                    teams: teams_html
                }));

                // adding user component to content
                $.setContent(self.element.querySelector('#user'), self.user.root);

                const main = self.element.querySelector('#main');

                /**
                 *
                 */
                let PLATFORM = [];
                team_log_data.forEach(current => {
                    if (PLATFORM.indexOf(current.browser.platform) < 0) {
                        PLATFORM.push(current.browser.platform);
                    }
                });

                /**
                 *
                 */
                const PLATFORM_CHART = await self.highchart.start({
                    "settings": {
                        "chart": {
                            "plotBackgroundColor": null,
                            "plotBorderWidth": null,
                            "plotShadow": false,
                            "type": "pie"
                        },
                        "title": {
                            "text": "Platform"
                        },
                        "tooltip": {
                            "pointFormat": "<b>{point.percentage:.1f}% ({point.y})</b>"
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
                                "name": "Platform",
                                "colorByPoint": true,
                                "data": PLATFORM.map(current => {
                                    return {
                                        "name": current,
                                        "y": team_log_data.reduce((result, current_log) => {
                                            if (current === current_log.browser.platform) {
                                                result++;
                                            }

                                            return result;
                                        }, 0)
                                    };
                                })
                            }
                        ]
                    }

                });

                const PLATFORM_CHART_AREA = self.element.querySelector('#platform_chart');
                PLATFORM_CHART_AREA.appendChild($.html(PLATFORM_CHART.root));

                /**
                 *
                 */
                let team_chooser = [];
                team_data.forEach((current, index) => {
                    team_chooser.push({
                        tag: "option",
                        value: index,
                        inner: current.name
                    });
                });

                /**
                 * Changes data for given Team-Index and refreshes areas
                 * @param index of team
                 * @returns {Promise<void>}
                 */
                async function changeTeam(index) {
                    // Queries HTML-Areas
                    const TEAM_CARD_AREA = self.element.querySelector('#teams_student_area');
                    const BOARD_CHART_AREA = self.element.querySelector('#uebersicht_karten');
                    const LOGIN_CHART_AREA = self.element.querySelector('#benutzung_anwendung');

                    // Clear Area
                    TEAM_CARD_AREA.innerHTML = "";
                    BOARD_CHART_AREA.innerHTML = "";
                    LOGIN_CHART_AREA.innerHTML = "";

                    let html_team_crads = TEAM_CARD_AREA.appendChild($.html({
                        class: "d-flex justify-content-around"
                    }));

                    aggregated_data[index].members.forEach(member => {

                        html_team_crads.appendChild($.html(self.html.card, {
                            card_header: member.name,
                            card_body: [
                                {
                                    class: "container-fluid",
                                    inner: [
                                        {
                                            class: "row",
                                            inner: "Anzahl Karten: " + member.cards.length
                                        },
                                        {
                                            class: "row",
                                            inner: "Teamanteil: " + (aggregated_data[index].card_count > 0 ? round(((member.cards.length / aggregated_data[index].card_count)*100), 0 )+ "%" : "0%"),
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

                    /**
                     * Column-Chart showing current card-count for each lane per team-member
                     */
                    const BOARD_CHART = await self.highchart.start({
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

                    // Appeds Char to html-area
                    BOARD_CHART_AREA.appendChild($.html(BOARD_CHART.root));

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

                    /**
                     * Pie Chart showing login-count per team-member
                     */
                    const LOGIN_CHART = await self.highchart.start({
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
                                "pointFormat": "<b>{point.y} ({point.percentage:.1f}%)</b>"
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

                    // Appends Login-Chart to html-area
                    LOGIN_CHART_AREA.appendChild($.html(LOGIN_CHART.root))

                }

                main.appendChild($.html(self.html.card, {
                    card_header: "Studierende",
                    card_body: {
                        inner: [
                            $.html(self.html.team_chooser, {
                                teams: team_chooser,
                                onchange: function (event) {
                                    changeTeam(this.value);
                                }
                            }),
                            {
                                id: "teams_student_area",
                            },
                            {
                                class: "row",
                                inner: [
                                    {
                                        id: "uebersicht_karten",
                                        class: "col-sm-6",
                                    }, {
                                        id: "benutzung_anwendung",
                                        class: "col-sm-6"
                                    }
                                ]
                            }
                        ]
                    }
                }));

                // Set Default team to show on init
                changeTeam(0);

                /**
                 * Returns Board for given key
                 * @param key
                 * @returns {*} board-data
                 */
                function getBoard(key) {
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
                 * @returns {*} card-data
                 */
                function getCard(key) {
                    let card = null;

                    card_data.forEach((current, index, card_data) => {
                        if (current.key === key) {
                            card = current;
                        }
                    });

                    return card;
                }

            };

            /**
             *
             * @param event
             * @param data
             * @returns {*}
             * @private
             */
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
     * MATHEMATICAL FUNCTIONS
     */

    function round(number, precision) {

        // Default Value if precision is not set
        if (precision == null || typeof precision == 'undefined') {
            precision = 1;
        }

        let factor = 1;
        for (let count = 0; count < precision; count++) {
            factor *= 10;
        }

        return (Math.round(number * factor) / factor);
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