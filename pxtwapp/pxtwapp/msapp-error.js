(function () {
    var validParameterNames = ["httpStatus", "failureName", "failureUrl"];

    function parseQueryParameters() {
        var query = location.search.slice(1);
        return query.split("&").reduce(function (queryParameters, rawPair) {
            var pair = rawPair.split("=").map(decodeURIComponent);
            queryParameters[pair[0]] = pair[1];
            return queryParameters;
        }, {});
    }

    function initialize() {
        var queryParameters = parseQueryParameters();
        var url = queryParameters["failureUrl"];
        var retryButton = document.getElementById("retryButton");

        if (url) {
            retryButton.addEventListener("click", (e) => {
                window.location.href = url;
            });
        } else {
            retryButton.style.display = none;
        }

        validParameterNames.forEach(function (parameterName) {
            var parameterValue = queryParameters[parameterName];

            if (parameterValue) {
                document.getElementById(parameterName + "Value").textContent = parameterValue;
            } else {
                document.getElementById(parameterName).remove();
            }
        });
    }

    function updateOnlineStatus(e) {
        var queryParameters = parseQueryParameters();
        var url = queryParameters["failureUrl"];
        if (url) {
            window.location.href = url;
        }
    }

    window.addEventListener("online", updateOnlineStatus);
    document.addEventListener("DOMContentLoaded", initialize);
}());
