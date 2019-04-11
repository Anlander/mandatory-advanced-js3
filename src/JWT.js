import { BehaviorSubject } from "rxjs";


export const token$ = new BehaviorSubject(window.localStorage.token || null);

export function updateToken(newToken){
  console.log(newToken)
    window.localStorage.setItem("token",newToken);
    token$.next(newToken);
}

export function removeToken(){
    window.localStorage.removeItem("token");
}
