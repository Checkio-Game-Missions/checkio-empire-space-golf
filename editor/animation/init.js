//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var ends = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"]

            options = options || {};
            var is_new_record = options.is_new_record || false;
            var place_rating = String(options.place_rating || 0);
            var best_points = options.best_points || 0;
            var current_points = options.current_points || 0;
            var $div = $("<div></div>");
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div class="result"></div></div>'));
            var $resultDiv = $h.find(".result");
            var $table = $("<table></table>").addClass("numbers");
            if (is_new_record) {
                $resultDiv.addClass("win-sign");
                $resultDiv.append($("<div></div>").text("You beat your best results!"));
                var $tr = $("<tr></tr>");
                $tr.append($("<th></th>").text(best_points));
                $tr.append($("<th></th>").text(place_rating).append($("<span></span>").addClass(".ends").text(ends[Number(place_rating[place_rating.length - 1])])));

                $table.append($tr);
                $tr = $("<tr></tr>");
                $tr.append($("<td></td>").text("Personal best"));
                $tr.append($("<td></td>").text("Place"));
                $table.append($tr);
            }
            else {
                $resultDiv.addClass("norm-sign");
                $resultDiv.append($("<div></div>").text("Your results"));
                $tr = $("<tr></tr>");
                $tr.append($("<th></th>").text(current_points));
                $tr.append($("<th></th>").text(best_points));
                $tr.append($("<th></th>").text(place_rating).append($("<span></span>").addClass(".ends").text(ends[Number(place_rating[place_rating.length - 1])])));

                $table.append($tr);
                $tr = $("<tr></tr>");
                $tr.append($("<td></td>").text("Points"));
                $tr.append($("<td></td>").text("Personal best"));
                $tr.append($("<td></td>").text("Place"));
                $table.append($tr);
            }
            $resultDiv.append($table);
            this_e.setAnimationHeight(255);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in || [
                [1, 1],
                [1, 9],
                [9, 9],
                [9, 1],
                [5, 5]
            ];

            var funcName = "golf";

            var checkioInputStr = funcName + '(' +
                JSON.stringify(checkioInput).replace("[[", "{[").replace("]]", "]}").replace(/\[/g, "(").replace(/\]/g, ")") + ')';

            var failError = function (dError) {
                $content.find('.call').html('Fail: ' + checkioInputStr);
                $content.find('.output').html(dError.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
            };

            if (data.error) {
                failError(data.error);
                return false;
            }

            if (data.ext && data.ext.inspector_fail) {
                failError(data.ext.inspector_result_addon);
                return false;
            }

            var rightResult = data.ext["show"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: ' + checkioInputStr);
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: ' + checkioInputStr);
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            if (explanation) {
                var canvas = new GolfField();
                canvas.prepare($content.find(".explanation")[0], explanation);
                canvas.lines(explanation);
            }


            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//            });
//        });

        function GolfField(options) {
            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            options = options || {};

            var format = Raphael.format;

            var padding = options.padding || 10;

            var cell = options.cell || 30;

            var size = padding + cell * 11;

            var x0 = cell;
            var y0 = size - cell;


            var attrAxis = {"stroke": colorBlue4, "stroke-width": 3, "arrow-end": "classic"};
            var attrLine = {"stroke": colorOrange4, "stroke-width": 3};
            var attrHole = {"stroke": colorBlue4, "fill": colorBlue1, "stroke-width": 2};
            var attrNumber = {"stroke": colorBlue4, "font-family": "Roboto, Arial, 'Open Sans', sans-serif", "font-size": cell * 0.6};

            var paper;
            var holeSet;
            var stepTime = 500;

            this.prepare = function (dom, holes) {
                paper = Raphael(dom, size, size);
                holeSet = paper.set();

                paper.path(format("M{0},{1}V{2}", x0, size - cell / 2, padding)).attr(attrAxis);
                paper.path(format("M{0},{1}H{2}", cell / 2, y0, size - padding)).attr(attrAxis);

                paper.text(x0 - cell / 2, y0 + cell / 2, "0").attr(attrNumber);
                paper.text(x0 + cell, y0 + cell / 2, "1").attr(attrNumber);
                paper.text(x0 + cell * 9, y0 + cell / 2, "9").attr(attrNumber);
                paper.text(x0 - cell / 2, y0 - cell, "1").attr(attrNumber);
                paper.text(x0 - cell / 2, y0 - cell * 9, "9").attr(attrNumber);

                for (var i = 0; i < holes.length; i++) {
                    var c = paper.circle(x0 + cell * holes[i][0], y0 - cell * holes[i][1], cell / 3);
                    c.attr(attrHole);
                    holeSet.push(c);
                }
            };

            this.lines = function (holes) {
                var prev = [0, 0];
                var i = 0;
                (function drawLines() {
                    if (i >= holes.length) {
                        return false;
                    }
                    var end = holes[i];
                    var p = paper.path(format("M{0},{1}L{0},{1}", x0 + cell * prev[0], y0 - cell * prev[1])).attr(attrLine);
                    p.toBack();
                    var newPath = format("M{0},{1}L{2},{3}",
                        x0 + cell * prev[0], y0 - cell * prev[1],
                        x0 + cell * holes[i][0], y0 - cell * holes[i][1]
                    );
                    prev = holes[i].slice();
                    i++;
                    p.animate({"path": newPath}, stepTime, callback = drawLines);
                })();
            }


        }


    }
);
