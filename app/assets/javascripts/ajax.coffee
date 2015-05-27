$(document).ready ->
  $("#stats").on("ajax:success", (e, data, status, xhr) ->
    $("#stats").append xhr.responseText
  ).on "ajax:error", (e, xhr, status, error) ->
    $("#stats").append "<tr><td colspan=2>ERROR</td></tr>"
