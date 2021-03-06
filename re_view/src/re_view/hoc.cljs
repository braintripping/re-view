(ns re-view.hoc
  (:require [re-view.core :as v :refer [defview]]
            [re-view.hiccup.core :as hiccup]
            ["react-dom" :as react-dom]
            [goog.object :as gobj]
            [goog.dom :as gdom]))

(defview bind-atom
  "Calls component with value of atom & re-renders when atom changes."
  {:key               (fn [_ _ prop-atom]
                        (let [args @prop-atom
                              {:keys [key id name]} (if (map? args)
                                                      args
                                                      (first args))]
                          (or key id name)))
   :view/did-mount    (fn [this component atom]
                        (some-> atom
                                (add-watch this (fn [_ _ old new]
                                                  (when (not= old new)
                                                    (v/force-update this))))))
   :view/will-unmount (fn [this _ atom]
                        (some-> atom
                                (remove-watch this)))}
  [_ component prop-atom]
  (let [args @prop-atom]
    (cond (vector? args)
          (apply component args)
          (map? args)
          (component args)
          :else
          (throw (js/Error (str "Invalid format of prop atom, should be vector or map: " args))))))

(defview Frame
  "Renders component (passed in as child) to an iFrame."
  {:spec/children     [:Element]
   :view/did-mount    (fn [this content]
                        (-> (v/dom-node this)
                            (gobj/getValueByKeys "contentDocument" "body")
                            (gdom/appendChild (gdom/createDom "div")))
                        (.renderFrame this content))
   :view/will-unmount (fn [this]
                        (react-dom/unmountComponentAtNode (.getElement this)))
   :get-element       (fn [this]
                        (-> (v/dom-node this)
                            (gobj/getValueByKeys "contentDocument" "body")
                            (gdom/getFirstElementChild)))
   :render-frame      (fn [this content]
                        (v/render-to-dom (hiccup/element
                                           [:div
                                            [:link {:type "text/css"
                                                    :rel  "stylesheet"
                                                    :href "/app.css"}]
                                            content]) (.getElement this)))}
  [{:keys [view/props]} component]
  [:iframe.bn.shadow-2 props])