var prototype = {
    /**
     * To PLACE the robot
     * @param  {INT|String} x X-coordinate
     * @param  {INT|String} y y-coordinate
     * @param  {String} f FACE coordinate ('NORTH','EAST', 'SOUTH', 'WEST'). Can
     * come either lowercased of uppercased
     * @return {Error|Robot}   If placed succsessfully it returs this, if not
     * successfully, it returns a corresponding Error instance
     * @public
     */
    place: function(x, y, f) {

        var arg = {};

        // Validate user input
        try {
            arg = this._validateInput(x, y, f);
        } catch (e) {
            return e;
        }

        // PLACE a robot only inside of the playground
        if (this._isOutOfPlayground(arg.x, arg.y)) {
            return new Error(this._messenger.getMessage({
                msg: 'wrongPlace'
            }));
        }

        // Places a robot - updates its X,Y,F
        this._setRobotPosition(arg.x, arg.y, arg.f);

        // Save that initial PLACE has been made
        if (!this._isFirstStepMade)
            this._isFirstStepMade = true;

        return this;
    },
    move: function() {
        var x, y, f;

        // Check if initial place of robo command was made
        if (!this._isFirstStepMade) {
            return new Error(this._messenger.getMessage({
                msg: 'noInitialCommand'
            }));;
        }

        x = this._oCurrentPosition.x;
        y = this._oCurrentPosition.y;
        f = this._oCurrentPosition.f;

        // Change X or Y correctly to
        switch (f) {
            case 0: // N
                ++y;
                break;
            case 1: // E
                ++x;
                break;
            case 2: // S
                --y
                break;
            case 3: // W
                --x;
                break;
        }

        // Check if the step in not outside the playground
        if (this._isOutOfPlayground(x, y)) {
            return new Error(this._messenger.getMessage({
                msg: 'wrongMove'
            }));
        }

        // updetes the robot's position
        this._setRobotPosition(x, y, this._config.aDirections[f]);

        return this;
    },
}