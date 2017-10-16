(defproject re-view-hiccup "0.1.15-SNAPSHOT"
  :description "Hiccup parser for re-view"

  :url "https://www.github.com/braintripping/re-view/tree/master/re_view_hiccup"

  :license {:name "MIT License"
            :url  "http://www.opensource.org/licenses/mit-license.php"}

  :min-lein-version "2.7.1"

  :dependencies [[org.clojure/clojure "1.9.0-alpha14"]
                 [org.clojure/clojurescript "1.9.946" :scope "provided"]]

  :lein-release {:deploy-via :clojars
                 :scm        :git}

  :cljsbuild {:builds [{:id           "test"
                        :source-paths ["src" "test"]
                        :npm-deps     {:react     "^16.0.0"
                                       :react-dom "^16.0.0"}
                        :install-deps true
                        :compiler     {:output-to     "resources/public/js/compiled/test.js"
                                       :output-dir    "resources/public/js/compiled/out"
                                       :asset-path    "/base/resources/public/js/compiled/out"
                                       :main          re-view-hiccup.runner
                                       :optimizations :none}}]}
  :plugins [[lein-doo "0.1.6"]]
  :source-paths ["src"])