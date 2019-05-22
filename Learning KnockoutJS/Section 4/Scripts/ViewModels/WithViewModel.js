var app = window.app || {};
app.WithViewModel = (function () {
    'use strict';
    var me = {
        taxonomies: [
        {
            Animal: {
                Name: 'Cheetah',
                Kingdom: {
                    Name: 'Animalia',
                    Phylum: {
                        Name: 'Chordata',
                        Class: {
                            Name: 'Mammalia',
                            Order: {
                                Name: 'Carnivora',
                                Family: {
                                    Name: 'Felidae',
                                    Genus: {
                                        Name: 'Acinynox',
                                        Species: {
                                            Name: 'Jubatus'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        {
            Animal: {
                Name: 'Koala',
                Kingdom: {
                    Name: 'Animalia',
                    Phylum: {
                        Name: 'Chordata',
                        Class: {
                            Name: 'Mammalia',
                            Order: {
                                Name: 'Diprotondontia',
                                Family: {
                                    Name: 'Phascolarctidae',
                                    Genus: {
                                        Name: 'Phascolarctos',
                                        Species: {
                                            Name: 'Cinereus'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        {
            Animal: {
                Name: 'Snowy Owl',
                Kingdom: {
                    Name: 'Animalia',
                    Phylum: {
                        Name: 'Chordata',
                        Class: {
                            Name: 'Aves',
                            Order: {
                                Name: 'Strigiformes',
                                Family: {
                                    Name: 'Strigidae',
                                    Genus: {
                                        Name: 'Nyctea',
                                        Species: {
                                            Name: 'Scandiaca'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }],
        //
        detail: detail,
        display: display
    };

    function detail(element) {
        alert(element.innerText);
    }

    function display(animal) {
        alert(animal.Name + "\n" + 
              animal.Kingdom.Name + "\n" + 
              animal.Kingdom.Phylum.Name + "\n" + 
              animal.Kingdom.Phylum.Class.Name + "\n" +
              animal.Kingdom.Phylum.Class.Order.Name + "\n" +
              animal.Kingdom.Phylum.Class.Order.Family.Name + "\n" +
              animal.Kingdom.Phylum.Class.Order.Family.Genus.Name + "\n" +
              animal.Kingdom.Phylum.Class.Order.Family.Genus.Species.Name);
    }

    return me;
}());