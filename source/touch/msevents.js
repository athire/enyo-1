//* @protected
(function() {
	// add touch-specific gesture feature
	var gesture = enyo.gesture;
	if (window.navigator.msPointerEnabled) {
		var msEvents = [
			"MSPointerDown",
			"MSPointerUp",
			"MSPointerMove",
			"MSPointerOver",
			"MSPointerOut",
			"MSPointerCancel",
			"MSGestureTap",
			"MSGestureDoubleTap",
			"MSGestureHold",
			"MSGestureStart",
			"MSGestureChange",
			"MSGestureEnd"
		];
		enyo.forEach(msEvents, function(e) {
			enyo.dispatcher.listen(document, e);
		});
		// add our own MSPointer event handler
		enyo.dispatcher.features.push(function(e) {
			if (handlers[e.type] && e.isPrimary) {
				handlers[e.type](e);
			}
		});
		// remove the default mouse event handlers
		enyo.gesture.events = {};
	}

	var makeEvent = function(inEvent) {
		var e = enyo.clone(inEvent);
		e.srcEvent = inEvent;
		// normalize "mouse button" info
		// 1: left, 2: right, 3: both left & right, 4: center
		e.which = inEvent.buttons;
		return e;
	};

	var handlers = {
		// FIXME: need to register for gestures in MSPointerDown
		// according to Microsoft docs
		/*MSGestureStart: function(inEvent) {
			enyo.dispatch(gestureNormalize("gesturestart", inEvent));
		},
		MSGestureChange: function(inEvent) {
			enyo.dispatch(gestureNormalize("gesturechange", inEvent));
		},
		MSGestureEnd: function(inEvent) {
			enyo.dispatch(gestureNormalize("gestureend", inEvent));
		},*/
		MSPointerDown: function(inEvent) {
			var e = makeEvent(inEvent);
			gesture.down(e);
		},
		MSPointerUp: function(inEvent) {
			var e = makeEvent(inEvent);
			gesture.up(e);
		},
		MSPointerMove: function(inEvent) {
			var e = makeEvent(inEvent);
			gesture.move(e);
		},
		MSPointerCancel: function(inEvent) {
			// FIXME: not really the same as touchend, as touch action
			// was cancelled, but Enyo doesn't have that concept
			var e = makeEvent(inEvent);
			gesture.up(e);
		},
		MSPointerOver: function(inEvent) {
			var e = makeEvent(inEvent);
			gesture.over(e);
		},
		MSPointerOut: function(inEvent) {
			var e = makeEvent(inEvent);
			gesture.out(e);
		}
	};
})();