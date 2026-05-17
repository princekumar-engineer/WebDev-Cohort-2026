/**
 * 🏰 Purani Haveli ka Security System - Encapsulation: Private Fields (#)
 *
 * Purani haveli mein ek advanced security system lagana hai! Private fields
 * (#) se sensitive data protect karo — passcode, residents list, aur access
 * log ko bahar se koi directly access nahi kar sakta. Sirf authorized methods
 * se hi data milega, aur woh bhi passcode verify karke.
 *
 * Class: HaveliSecurity
 *
 *   Private Fields:
 *     #passcode    - Haveli ka secret passcode (string)
 *     #residents   - Array of resident objects
 *     #accessLog   - Array of access entry objects
 *     #maxResidents - Maximum number of residents allowed
 *
 *   constructor(haveliName, passcode, maxResidents)
 *     - this.haveliName = haveliName (public)
 *     - this.#passcode = passcode
 *     - this.#residents = []
 *     - this.#accessLog = []
 *     - this.#maxResidents = maxResidents
 *
 *   addResident(name, role, passcode)
 *     - Only works if passcode matches this.#passcode
 *     - role must be one of: "malik", "naukar", "mehmaan"
 *     - Agar passcode wrong: return { success: false, message: "Galat passcode!" }
 *     - Agar role invalid: return { success: false, message: "Invalid role!" }
 *     - Agar name already exists in #residents: return { success: false, message: "Already a resident!" }
 *     - Agar #residents.length >= #maxResidents: return { success: false, message: "Haveli full hai!" }
 *     - Otherwise: push { name, role, addedAt: new Date().toISOString() } to #residents
 *     - Returns { success: true, message: "${name} ab haveli ka ${role} hai!" }
 *
 *   removeResident(name, passcode)
 *     - Only works if passcode matches
 *     - Removes resident by name from #residents
 *     - Agar passcode wrong: return { success: false, message: "Galat passcode!" }
 *     - Agar resident not found: return { success: false, message: "Resident nahi mila!" }
 *     - Returns { success: true, message: "${name} ko haveli se nikal diya!" }
 *
 *   verifyAccess(name)
 *     - Checks if name is in #residents
 *     - If yes: logs { name, time: new Date().toISOString(), allowed: true } to #accessLog
 *       Returns { allowed: true, message: "Swagat hai ${name}!" }
 *     - If no: logs { name, time: new Date().toISOString(), allowed: false } to #accessLog
 *       Returns { allowed: false, message: "Aapka entry allowed nahi hai!" }
 *
 *   getAccessLog(passcode)
 *     - Returns COPY of #accessLog if passcode matches
 *     - Returns null if passcode is wrong
 *
 *   changePasscode(oldPasscode, newPasscode)
 *     - Validates oldPasscode matches current #passcode
 *     - newPasscode must be at least 4 characters
 *     - If old wrong: return { success: false, message: "Purana passcode galat hai!" }
 *     - If new too short: return { success: false, message: "Naya passcode bahut chhota hai!" }
 *     - Updates #passcode, returns { success: true, message: "Passcode badal diya!" }
 *
 *   getResidentCount()
 *     - Returns number of residents (without exposing the list)
 *
 *   isResident(name)
 *     - Returns true/false if name is in #residents
 *     - Does NOT expose any other resident details
 *
 * Rules:
 *   - ALL sensitive data must use # private fields
 *   - Private fields should NOT be accessible from outside the class
 *   - getAccessLog returns a copy, not the original array
 *   - Passcode is required for any write operation on residents
 *   - verifyAccess does NOT require passcode (it's like checking at the gate)
 *   - Roles are case-sensitive: exactly "malik", "naukar", "mehmaan"
 *
 * @example
 *   const haveli = new HaveliSecurity("Sheesh Mahal", "raja1234", 5);
 *   haveli.addResident("Thakur Sahab", "malik", "raja1234");
 *   // => { success: true, message: "Thakur Sahab ab haveli ka malik hai!" }
 *   haveli.addResident("Ramu", "naukar", "wrongpass");
 *   // => { success: false, message: "Galat passcode!" }
 *   haveli.verifyAccess("Thakur Sahab");
 *   // => { allowed: true, message: "Swagat hai Thakur Sahab!" }
 *   haveli.verifyAccess("Chor");
 *   // => { allowed: false, message: "Aapka entry allowed nahi hai!" }
 *   haveli.getResidentCount();  // => 1
 *   haveli.isResident("Thakur Sahab");  // => true
 *   haveli.#passcode;  // SyntaxError! Private field not accessible
 */
export class HaveliSecurity {
  #passcode;
  #residents;
  #accessLog;
  #maxResidents;

  constructor(haveliName, passcode, maxResidents) {
    this.haveliName = haveliName;

    this.#passcode = passcode;
    this.#residents = [];
    this.#accessLog = [];
    this.#maxResidents = maxResidents;
  }

  addResident(name, role, passcode) {
    const validRoles = ["malik", "naukar", "mehmaan"];

    //passcode validation
    if (passcode !== this.#passcode) {
      return {
        success: false,
        message: "Galat passcode!"
      };
    }
    
    // role validation
    if (!validRoles.includes(role)) {
      return {
        success: false,
        message: "Invalid role!"        
      };
    }
  
    // duplicate check
    const exists = this.#residents.some(
      resident => resident.name === name
    );

    if (exists) {
      return {
        success: false,
        message: "Already a resident!"
      }
    }
    // capacity check
    if (this.#residents.length >= this.#maxResidents) {
      return {
        success: false,
        message: "Haveli full hai!"
      };
    }

    this.#residents.push({
      name,
      role,
      addedAt: new Date().toISOString()
    });

    return {
    success: true,
    message: `${name} ab haveli ka ${role} hai!`      
    }
  }

  removeResident(name, passcode) {
    // passcode validation
    if (passcode !== this.#passcode) {
      return {
        success: false,
        message: "Galat passcode!"
      };
    }

    const index = this.#residents.findIndex(
      resident => resident.name === name
    );

    if (index === -1) {
      return {
        success: false,
        message: "Resident nahi mila!"
      };
    }

    this.#residents.splice(index, 1);

    return {
      success: true,
      message: `${name} ko haveli se nikal diya!`
    };  
  }
  verifyAccess(name) {
    const exists = this.#residents.some(
      resident => resident.name === name
    );

    const logEntry = {
      name,
      time: new Date().toISOString(),
      allowed: exists
    };

    this.#accessLog.push(logEntry);

    if (exists) {
      return {
        allowed: true,
        message: `Swagat hai ${name}!`
      };
    }

    return {
      allowed: false,
      message: "Aapka entry allowed nahi hai!"
    };
  }

  getAccessLog(passcode) {
    if (passcode !== this.#passcode) {
      return null;
    }

    return [...this.#accessLog];
  }

  changePasscode(oldPasscode, newPasscode) {
    if (oldPasscode !== this.#passcode) {
      return {
        success: false,
        message: "Purana passcode galat hai!"
      };
    }

    if (newPasscode.length < 4) {
      return {
        success: false,
        message: "Naya passcode bahut chhota hai!"
      };
    }

    this.#passcode = newPasscode;

    return {
      success: true,
      message: "Passcode badal diya!"
    };
  }

  getResidentCount() {
    return this.#residents.length;
  }

  isResident(name) {
    return this.#residents.some(
      resident => resident.name === name
    );
  }
}