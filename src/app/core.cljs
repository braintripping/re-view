(ns app.core
  (:require [cljsjs.react]
            [cljsjs.react.dom]
            [clojure.core.match :refer-macros [match]]

            [re-view.core :as v :refer-macros [defview]]
            [re-view-routing.core :as r]
            [re-db.d :as d]

            [clojure.spec :as s :include-macros true]

            [app.examples :as examples]))

(enable-console-print!)

(defview root
  "The root component reads current router location from re-db,
   and will therefore re-render whenever this value changes."
  []
  (match (d/get :router/current-location :segments)
         [] (examples/re-view-examples nil)
         :else [:div "not found"]))

(defn init []
  (r/on-location-change
    (fn [route] (d/transact! [(assoc route :db/id :router/current-location)])))
  (v/render-to-element (root) "app"))

(defonce _ (init))
