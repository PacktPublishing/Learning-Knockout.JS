ko.bindingHandlers.button = {
    init: function (element, valueAccessor) {
        var options = ko.unwrap(valueAccessor()) || {};
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).button('destroy');
        });
        $(element).button(options);
    }
};
ko.bindingHandlers.clearOnFocus = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (value) {
            $(element).off('focus.clearOnFocus').on('focus.clearOnFocus', function (evt) {
                $(element).val('');
                return false;
            });
        } else {
            $(element).off('focus.clearOnFocus');

        }
    }
};
ko.bindingHandlers.dialog = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().dialogOptions || {};
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).dialog('destroy');
        });
        setTimeout(function () {
            $(element).dialog(options);
        }, 1);
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if ($(element).data('ui-dialog') || $(element).data('dialog')) {
            $(element).dialog(value ? 'open' : 'close');
        }
    }
};
ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options);
        ko.utils.registerEventHandler(element, 'change', function () {
            var observable = valueAccessor();
            observable($(element).datepicker('getDate'));
        });
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datepicker('destroy');
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor()),
            current;
        if (String(value).indexOf('/Date(') === 0) {
            value = new Date(parseInt(value.replace(/\/Date\((.*?)\)\//gi, '$1')));
        } else if (String(value).indexOf('T') === 10) {
            value = new Date(value);
        }
        current = $(element).datepicker('getDate');
        if (value - current !== 0) {
            $(element).datepicker('setDate', value);
        }
    }
};
ko.bindingHandlers.tabFieldsOnEnter = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (value) {
            $(element).off('keydown.tabFieldsOnEnter').on('keydown.tabFieldsOnEnter', 'input,select', function (evt) {
                var focusable,
                    next;
                if (evt.keyCode === 13) {
                    focusable = $(element).find('input,select,textarea').filter(':visible');
                    next = focusable.eq(focusable.index(this) === focusable.length - 1 ? 0 : focusable.index(this) + 1);
                    next.focus();
                    return false;
                }
            });
        } else {
            $(element).off('keydown.tabFieldsOnEnter');
        }
    }
};
ko.extenders.numeric = function (target, precision) {
    var result = ko.computed({
        read: target,
        write: function (newValue) {
            var current = target(),
                roundingMultiplier = Math.pow(10, precision),
                newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
            if (valueToWrite !== current) {
                target(valueToWrite);
            } else {
                if (newValue !== current)
                    target.notifySubscribers(valueToWrite);
            }
        }
    }).extend({ notify: 'always' });
    result(target());
    return result;
};
ko.extenders.pager = function (target, pageSize) {
    var _max = 10,
        _size = ko.observable(pageSize || _max),
        _current = ko.observable(1);
    target.size = ko.pureComputed({
        read: _size,
        write: function (newValue) {
            if (newValue > 0) {
                _size(newValue);
            } else {
                _size(_max);
            }
        }
    });
    target.count = ko.pureComputed(function () {
        return Math.ceil(target().length / target.size()) || 1;
    });
    target.current = ko.pureComputed({
        read: _current,
        write: function (newValue) {
            if (newValue <= 0) {
                _current(1);
            } else if (newValue > target.count()) {
                _current(target.count());
            } else {
                _current(newValue);
            }
        }
    });
    target.paged = ko.pureComputed(function () {
        var s = _size(),
            i = _current();
        return target().slice(s * (i - 1), s * i);
    });
    target.first = function () {
        target.current(1);
    };
    target.last = function () {
        target.current(target.count());
    };
    target.next = function () {
        target.current(target.current() + 1);
    };
    target.previous = function () {
        target.current(target.current() - 1);
    };
    return target;
};
ko.extenders.required = function (target, message) {
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();
    function validate(newValue) {
        target.hasError(newValue ? false : true);
        target.validationMessage(newValue ? "" : message || "This field is required");
    }
    validate(target());
    target.subscribe(validate);
    return target;
};
ko.extenders.validDate = function (target, message) {
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();
    function validate(newValue) {
        target.hasError(newValue ? isNaN(Date.parse(newValue)) : false);
        target.validationMessage(newValue ? "" : message || "Date is invalid");
    }
    validate(target());
    target.subscribe(validate);
    return target;
};
ko.observableArray.fn.filterByProperty = function (property, value) {
    return ko.pureComputed(function () {
        var items = this(),
            matches = [],
            current = null,
            i, l;
        for (i = 0, l = items.length; i < l; i++) {
            current = items[i];
            if (ko.unwrap(current[property]) === value) {
                matches.push(current);
            }
        }
        return matches;
    }, this);
};
