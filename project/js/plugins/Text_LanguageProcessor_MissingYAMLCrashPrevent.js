

(function($) {
    const Alias_getTextData = $.getTextData;
        $.getTextData = function(file, name, language) {
            // Set Default Language
            if (language === undefined) { language = this._language; }
            if (!this._data[language].text[file][name])
               return data = {
                    faceset: "",
                    faceindex: 0,
                    background: 0,
                    position: 2,
                    text: "This message doesn't exist " + file + ' ' +  name + ' ' + language
                };

            // Return Text Data
            return Alias_getTextData.call(this, file,name, language);
        };
})(LanguageManager);


